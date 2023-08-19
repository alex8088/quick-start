#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const prompts = require('prompts')
const { yellow, green, blue, red, lightBlue, reset } = require('kolorist')
const {
  copy,
  emptyDir,
  readYamlFile,
  writeYamlFile,
  readJsonFile,
  writeJsonFile,
  writeFile
} = require('./utils/fsExtra')
const generateReadme = require('./utils/generateReadme')
const getCommand = require('./utils/getCommand')
const useElectronUpdater = require('./utils/useElectronUpdater')
const sortDependencies = require('./utils/sortDependencies')

const FRAMEWORKS = [
  {
    name: 'vanilla',
    color: yellow
  },
  {
    name: 'vue',
    color: green
  },
  {
    name: 'react',
    color: lightBlue
  },
  {
    name: 'svelte',
    color: red
  },
  {
    name: 'solid',
    color: blue
  }
]

const TS_TEMPLATES = FRAMEWORKS.map((t) => `${t.name}-ts`)
const TEMPLATES = FRAMEWORKS.map((t) => t.name).concat(TS_TEMPLATES)

const DEFAULT_PRO_NAME = 'electron-app'

async function init() {
  const argv = minimist(process.argv.slice(2), { string: [0] })
  const cwd = process.cwd()

  let targetDir = argv._[0]
  let template = argv.template || argv.t

  let skip = argv.skip || false

  const defaultProjectName = !targetDir ? DEFAULT_PRO_NAME : targetDir

  let result = {}

  try {
    result = await prompts([
      {
        name: 'projectName',
        type: targetDir ? null : 'text',
        message: reset('Project name:'),
        initial: defaultProjectName,
        onState: (state) => (targetDir = state.value.trim() || defaultProjectName)
      },
      {
        name: 'shouldOverwrite',
        type: () => (canSafelyOverwrite(targetDir) || skip ? null : 'confirm'),
        message: () =>
          (targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`) +
          ` is not empty. Remove existing files and continue?`
      },
      {
        name: 'overwriteChecker',
        type: (_, { shouldOverwrite } = {}) => {
          if (shouldOverwrite === false) {
            throw new Error(red('✖') + ' Operation cancelled')
          }
          return null
        }
      },
      {
        name: 'packageName',
        type: () => (isValidPackageName(targetDir) ? null : 'text'),
        message: 'Package name:',
        initial: () => toValidPackageName(targetDir),
        validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name'
      },
      {
        name: 'framework',
        type: skip || (template && TEMPLATES.includes(template)) ? null : 'select',
        message:
          typeof template === 'string' && !TEMPLATES.includes(template)
            ? reset(`"${template}" isn't a valid template. Please choose from below: `)
            : reset('Select a framework:'),
        initial: 0,
        choices: FRAMEWORKS.map((framework) => {
          const frameworkColor = framework.color
          return {
            title: frameworkColor(framework.name),
            value: framework.name
          }
        })
      },
      {
        name: 'needsTypeScript',
        type: () => (skip || (template && TS_TEMPLATES.includes(template)) ? null : 'toggle'),
        message: 'Add TypeScript?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
      },
      {
        name: 'needsUpdater',
        type: () => (skip ? null : 'toggle'),
        message: 'Add Electron updater plugin?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
      },
      {
        name: 'needsMirror',
        type: () => (skip ? null : 'toggle'),
        message: 'Enable Electron download mirror proxy?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
      }
    ])
  } catch (cancelled) {
    console.log(cancelled.message)
    return
  }

  const {
    shouldOverwrite = skip,
    packageName = targetDir,
    framework,
    needsTypeScript,
    needsUpdater,
    needsMirror
  } = result

  const root = path.join(cwd, targetDir)

  if (fs.existsSync(root) && shouldOverwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  template = framework || template

  if (!TS_TEMPLATES.includes(template) && needsTypeScript) {
    template = `${template}-ts`
  }

  console.log(`\nScaffolding project in ${root}...`)

  const templateRoot = path.join(__dirname, 'template')
  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName)
    copy(templateDir, root)
  }

  // Render base template
  render('base')

  // Render variant template
  render(template)

  if (template === 'svelte' || template === 'svelte-ts') {
    const prettierConfigFile = path.resolve(root, '.prettierrc.yaml')
    let config = readYamlFile(prettierConfigFile)
    config.plugins = ['prettier-plugin-svelte']
    config.overrides = [{ files: '*.svelte', options: { parser: 'svelte' } }]
    writeYamlFile(prettierConfigFile, config)

    const vscodeSettingFile = path.resolve(root, '.vscode/settings.json')
    let settings = readJsonFile(vscodeSettingFile)
    settings['[svelte]'] = { 'editor.defaultFormatter': 'svelte.svelte-vscode' }
    settings['svelte.enable-ts-plugin'] = true
    settings['eslint.validate'] = ['javascript', 'javascriptreact', 'svelte']
    writeJsonFile(vscodeSettingFile, settings)
  }

  fs.renameSync(path.resolve(root, '_gitignore'), path.resolve(root, '.gitignore'))

  const builderConfigFile = path.resolve(root, 'electron-builder.yml')
  let config = readYamlFile(builderConfigFile)
  config.productName = packageName
  config.win.executableName = packageName
  writeYamlFile(builderConfigFile, config)

  const packageFile = path.join(root, `package.json`)
  const pkg = readJsonFile(packageFile)
  pkg.name = packageName

  if (needsUpdater) {
    const updater = useElectronUpdater(packageName)
    writeYamlFile(path.resolve(root, 'dev-app-update.yml'), updater.config)
    pkg.dependencies = { ...pkg.dependencies, ...updater.dependencies }
  }

  writeJsonFile(packageFile, sortDependencies(pkg))

  const userAgent = process.env.npm_config_user_agent ?? ''
  const pkgManager = /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm'

  let npmrc = ''
  if (needsMirror) {
    npmrc = 'ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/\n'
  }

  if (pkgManager === 'pnpm' && !skip) {
    npmrc += 'shamefully-hoist=true\n'
  }

  if (npmrc) {
    writeFile(path.resolve(root, '.npmrc'), npmrc)
  }

  const readme = generateReadme(template, packageName, pkgManager)
  writeFile(path.resolve(root, 'README.md'), readme)

  console.log(`\nDone. Now run:\n`)

  if (root !== cwd) {
    const dir = path.relative(cwd, root)
    console.log(`  cd ${dir.includes(' ') ? `"${dir}"` : dir}`)
  }

  console.log(`  ${getCommand(pkgManager, 'install')}`)
  console.log(`  ${getCommand(pkgManager, 'dev')}`)
  console.log()
}

function canSafelyOverwrite(dir) {
  return !fs.existsSync(dir) || fs.readdirSync(dir).length === 0
}

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName)
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')
}

init().catch((e) => {
  console.error(e)
})
