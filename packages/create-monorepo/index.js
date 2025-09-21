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
        name: 'needsTest',
        type: () => (skip || test ? null : 'toggle'),
        message: 'Add Test?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
      },
      {
        name: 'needsTSExecution',
        type: () => (skip || runTS ? null : 'toggle'),
        message: 'Add TypeScript execution(tsx)?',
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

  if (needsTest) {
    render('test')
  }

  if (needsTSExecution) {
    render('env')
  }

  fs.renameSync(path.resolve(root, '_gitignore'), path.resolve(root, '.gitignore'))

  const readme = `# ${packageName}

A monorepo starter

## Packages

| Package       | Description       | Version        |
| ------------- | :---------------- |  :------------ |
| [@${packageName}/foo](packages/foo) | A minimal typescript library | |
`
  writeFile(path.resolve(root, 'README.md'), readme)

  const packageFile = path.join(root, `package.json`)
  const pkg = readJsonFile(packageFile)
  pkg.name = packageName

  if (!needsTest) {
    delete pkg.scripts['test:foo']
    delete pkg.devDependencies['vitest']
  }

  if (!needsTSExecution) {
    delete pkg.scripts['dev:foo']
    delete pkg.devDependencies['tsx']
  }

  writeJsonFile(packageFile, pkg)

  const fooReadme = `# @${packageName}/foo

A minimal typescript library.
${
  needsTSExecution
    ? `
## Development

\`\`\`sh
$ pnpm dev:foo
\`\`\`
`
    : ''
}
## Build

\`\`\`sh
$ pnpm build:foo
\`\`\`
${
  needsTest
    ? `
## Test

\`\`\`sh
$ pnpm test:foo
\`\`\`
`
    : ''
}`

  writeFile(path.resolve(root, 'packages', 'foo', 'README.md'), fooReadme)

  const fooPackageFile = path.join(root, 'packages', 'foo', `package.json`)
  const fooPkg = readJsonFile(fooPackageFile)
  fooPkg.name = `@${packageName}/foo`

  if (!needsTest) {
    delete fooPkg.scripts['test']
  }

  if (!needsTSExecution) {
    delete fooPkg.scripts['dev']
  }

  writeJsonFile(fooPackageFile, fooPkg)

  if (needsTSExecution) {
    const tsConfigFile = path.join(root, 'packages', 'foo', `tsconfig.json`)
    const tsc = readJsonFile(tsConfigFile)
    tsc.include = [...tsc.include, 'env.d.ts']
    writeJsonFile(tsConfigFile, tsc)
  }

  writeFile(path.resolve(root, '.npmrc'), 'shamefully-hoist=true\nauto-install-peers=false\n')

  console.log(`\nDone. Now run:\n`)

  if (root !== cwd) {
    const dir = path.relative(cwd, root)
    console.log(`  cd ${dir.includes(' ') ? `"${dir}"` : dir}`)
  }
  console.log(`  pnpm i\n`)
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
