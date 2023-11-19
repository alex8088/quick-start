#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const prompts = require('prompts')
const { red, reset } = require('kolorist')
const { copy, emptyDir, readJsonFile, writeJsonFile, writeFile } = require('./utils/fsExtra')
const getCommand = require('./utils/getCommand')

const DEFAULT_PRO_NAME = 'my-docs'

async function init() {
  const argv = minimist(process.argv.slice(2), { string: [0] })
  const cwd = process.cwd()

  let targetDir = argv._[0]
  let ts = argv.ts
  let i18n = argv.i18n || false
  let locale = argv.locale || ''

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
        name: 'needsTypeScript',
        type: () => (skip || ts ? null : 'toggle'),
        message: 'Add TypeScript?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
      },
      {
        name: 'needsI18n',
        type: () => (skip || i18n ? null : 'toggle'),
        message: 'Need i18n?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
      },
      {
        name: 'defaultLocale',
        type: (needsI18n) =>
          skip || needsI18n || (locale && ['zh'].includes(locale)) ? null : 'select',
        message: 'Select a locale',
        initial: 0,
        choices: [
          {
            title: 'default',
            value: ''
          },
          {
            title: 'zh',
            value: 'zh'
          }
        ]
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
    needsI18n = i18n,
    defaultLocale = locale
  } = result

  const root = path.join(cwd, targetDir)

  if (fs.existsSync(root) && shouldOverwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  const localePrefix = defaultLocale === 'zh' ? '-zh' : ''
  const template = `docs${needsI18n ? '-i18n' : localePrefix}${needsTypeScript ? '-ts' : ''}`

  console.log(`\nScaffolding project in ${root}...`)

  const templateRoot = path.join(__dirname, 'template')
  const render = function render(templateName, dir = '') {
    const templateDir = path.resolve(templateRoot, templateName)
    copy(templateDir, dir || root)
  }

  // Render base template
  render('base')
  render(`base-${needsTypeScript ? 'ts' : 'js'}`)

  // Render i18n template
  if (needsI18n) {
    render('i18n/en', path.join(root, 'docs'))
    render('i18n/zh', path.join(root, 'docs/zh'))
  } else {
    render(`i18n/${defaultLocale ? defaultLocale : 'en'}`, path.join(root, 'docs'))
  }

  // Render variant template
  render(template)

  fs.renameSync(path.resolve(root, '_gitignore'), path.resolve(root, '.gitignore'))

  const packageFile = path.join(root, `package.json`)
  const pkg = readJsonFile(packageFile)
  pkg.name = packageName

  writeJsonFile(packageFile, pkg)

  const userAgent = process.env.npm_config_user_agent ?? ''
  const pkgManager = /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm'

  const readme = `# ${packageName}

This site is built with [VitePress](https://vitepress.dev).

## Install

\`\`\`bash
$ ${getCommand(pkgManager, 'install')}
\`\`\`

## Development

\`\`\`bash
$ ${getCommand(pkgManager, 'dev')}
\`\`\`

## Build

\`\`\`bash
$ ${getCommand(pkgManager, 'build')}
\`\`\`
`
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
