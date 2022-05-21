#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const prompts = require('prompts')
const { red, green, gray, reset } = require('kolorist')
const {
  copy,
  emptyDir,
  readJsonFile,
  writeJsonFile,
  readFile,
  writeFile
} = require('./utils/fsExtra')

const THEMES = [
  {
    name: 'vue',
    value: '-vue',
    color: green
  },
  {
    name: 'default',
    value: '',
    color: gray
  }
]

const DEFAULT_PRO_NAME = 'my-docs'

async function init() {
  const argv = minimist(process.argv.slice(2), { string: [0] })
  const cwd = process.cwd()

  let targetDir = argv._[0]
  let ts = argv.ts
  let theme = argv.theme

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
        name: 'vitepressTheme',
        type: skip || (theme && THEMES.some((t) => t.name === theme)) ? null : 'select',
        message:
          typeof theme === 'string' && !THEMES.includes(theme)
            ? reset(`"${theme}" isn't a valid theme. Please choose from below: `)
            : reset('Select a theme:'),
        initial: 0,
        choices: THEMES.map((theme) => {
          const frameworkColor = theme.color
          return {
            title: frameworkColor(theme.name),
            value: theme.value
          }
        })
      },
      {
        name: 'needsTypeScript',
        type: () => (skip || ts ? null : 'toggle'),
        message: 'Add TypeScript?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
      }
    ])
  } catch (cancelled) {
    console.log(cancelled.message)
    return
  }

  let {
    shouldOverwrite = skip,
    packageName = targetDir,
    needsTypeScript = ts,
    vitepressTheme
  } = result

  const root = path.join(cwd, targetDir)

  if (fs.existsSync(root) && shouldOverwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  if (skip) vitepressTheme = theme ? `-${theme}` : ''

  const template = `docs${vitepressTheme}${needsTypeScript ? '-ts' : ''}`

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

  fs.renameSync(path.resolve(root, '_gitignore'), path.resolve(root, '.gitignore'))

  const readmeFile = path.resolve(root, 'README.md')
  let readme = readFile(readmeFile)
  readme = `# ${packageName}

  ${readme}
  `
  writeFile(readmeFile, readme)

  const packageFile = path.join(root, `package.json`)
  const pkg = readJsonFile(packageFile)
  pkg.name = packageName

  writeJsonFile(packageFile, pkg)

  console.log(`\nDone. Now run:\n`)

  const userAgent = process.env.npm_config_user_agent ?? ''
  const pkgManager = /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm'

  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`)
  }
  switch (pkgManager) {
    case 'yarn':
      console.log('  yarn')
      console.log('  yarn dev')
      break
    default:
      console.log(`  ${pkgManager} install`)
      console.log(`  ${pkgManager} run dev`)
      break
  }
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
