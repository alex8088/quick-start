#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const prompts = require('prompts')
const { red, reset } = require('kolorist')
const {
  copy,
  emptyDir,
  readJsonFile,
  writeJsonFile,
  readFile,
  writeFile
} = require('./utils/fsExtra')

const DEFAULT_PRO_NAME = 'my-monorepo'

async function init() {
  const argv = minimist(process.argv.slice(2), { string: [0] })
  const cwd = process.cwd()

  let targetDir = argv._[0]
  let test = argv.test

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
        name: 'needsTest',
        type: () => (skip || test ? null : 'toggle'),
        message: 'Add Test?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
      }
    ])
  } catch (cancelled) {
    console.log(cancelled.message)
    return
  }

  let { shouldOverwrite = skip, packageName = targetDir, needsTest = test } = result

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

  if (needsTest) {
    render('test')
  } else {
    render('default')
  }

  fs.renameSync(path.resolve(root, '_gitignore'), path.resolve(root, '.gitignore'))

  const readmeFile = path.resolve(root, 'README.md')
  let readme = readFile(readmeFile)
  readme = `# ${packageName}

  ${readme}| [@${packageName}/foo](packages/foo) | A minimal typescript library | |

  `
  writeFile(readmeFile, readme)

  const packageFile = path.join(root, `package.json`)
  const pkg = readJsonFile(packageFile)
  pkg.name = packageName
  writeJsonFile(packageFile, pkg)

  const fooReadmeFile = path.resolve(root, 'packages', 'foo', 'README.md')
  let fooReadme = readFile(fooReadmeFile)
  fooReadme = `# @${packageName}/foo

  ${fooReadme}`

  writeFile(fooReadmeFile, fooReadme)

  const fooPackageFile = path.join(root, 'packages', 'foo', `package.json`)
  const fooPkg = readJsonFile(fooPackageFile)
  fooPkg.name = `@${packageName}/foo`
  writeJsonFile(fooPackageFile, fooPkg)

  console.log(`\nDone. Remind that the package manager must be pnpm. Now run:\n`)

  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`)
  }
  console.log(`  pnpm i`)
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
