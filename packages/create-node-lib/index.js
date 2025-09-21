#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const prompts = require('prompts')
const { red, reset } = require('kolorist')
const { copy, emptyDir, readJsonFile, writeJsonFile, writeFile } = require('./utils/fsExtra')
const getCommand = require('./utils/getCommand')

const DEFAULT_PRO_NAME = 'my-node-lib'
const BUNDLERS = ['rollup', 'tsdown']

async function init() {
  const argv = minimist(process.argv.slice(2), { string: [0] })
  const cwd = process.cwd()

  let targetDir = argv._[0]
  let bundler = argv.bundler || ''
  let test = argv.test || false
  let runTS = argv.runTS || false

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
        name: 'defaultBundler',
        type: () => (skip || (bundler && BUNDLERS.includes(bundler)) ? null : 'select'),
        message: 'Select a bundler',
        initial: 0,
        choices: BUNDLERS.map((bundler) => ({ title: bundler, value: bundler }))
      },
      {
        name: 'needsTest',
        type: () => (skip || test ? null : 'toggle'),
        message: 'Add test?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
      },
      {
        name: 'needsTSExecution',
        type: () => (skip || runTS ? null : 'toggle'),
        message: 'Add TypeScript Execution(tsx)?',
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
    defaultBundler = bundler,
    needsTest = test,
    needsTSExecution = runTS
  } = result

  const root = path.join(cwd, targetDir)

  if (fs.existsSync(root) && shouldOverwrite) {
    emptyDir(root)
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }

  console.log(`\nScaffolding project in ${root}...`)

  const templateRoot = path.join(__dirname, 'template')
  const render = function render(templateName) {
    const templateDir = path.resolve(templateRoot, templateName)
    copy(templateDir, root)
  }

  render('base')

  render(defaultBundler)

  if (needsTest) {
    render('test')
  }

  if (needsTSExecution) {
    render('env')
  }

  fs.renameSync(path.resolve(root, '_gitignore'), path.resolve(root, '.gitignore'))

  const packageFile = path.join(root, `package.json`)
  const pkg = readJsonFile(packageFile)
  pkg.name = packageName

  if (!needsTest) {
    delete pkg.scripts['test']
    delete pkg.devDependencies['vitest']
  }

  if (!needsTSExecution) {
    delete pkg.scripts['dev']
    delete pkg.devDependencies['tsx']
  }

  writeJsonFile(packageFile, pkg)

  const tsConfigFile = path.join(root, `tsconfig.json`)
  const tsc = readJsonFile(tsConfigFile)
  if (needsTSExecution) {
    tsc.include.push('env.d.ts')
  }
  tsc.include.push(`${defaultBundler}.config.ts`)

  writeJsonFile(tsConfigFile, tsc)

  const userAgent = process.env.npm_config_user_agent ?? ''
  const pkgManager = /pnpm/.test(userAgent) ? 'pnpm' : /yarn/.test(userAgent) ? 'yarn' : 'npm'

  const readme = `# ${packageName}

A Node.js library starter.
${
  needsTSExecution
    ? `
## Development

\`\`\`sh
$ ${getCommand(pkgManager, 'dev')}
\`\`\`
`
    : ''
}
## Build

\`\`\`sh
$ ${getCommand(pkgManager, 'build')}
\`\`\`
${
  needsTest
    ? `
## Test

\`\`\`sh
$ ${getCommand(pkgManager, 'test')}
\`\`\`
`
    : ''
}`

  writeFile(path.resolve(root, 'README.md'), readme)

  console.log(`\nDone. Now run:\n`)

  if (root !== cwd) {
    const dir = path.relative(cwd, root)
    console.log(`  cd ${dir.includes(' ') ? `"${dir}"` : dir}`)
  }

  console.log(`  ${getCommand(pkgManager, 'install')}`)
  console.log(`  ${getCommand(pkgManager, 'build')}`)
  if (needsTest) {
    console.log(`  ${getCommand(pkgManager, 'test')}`)
  }
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
