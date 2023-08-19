const getCommand = require('./getCommand')

const descriptions = {
  vanilla: 'A minimal Electron application',
  'vanilla-ts': 'A minimal Electron application with TypeScript',
  vue: 'An Electron application with Vue',
  'vue-ts': 'An Electron application with Vue and TypeScript',
  react: 'An Electron application with React',
  'react-ts': 'An Electron application with React and TypeScript',
  svelte: 'An Electron application with Svelte',
  'svelte-ts': 'An Electron application with Svelte and TypeScript',
  solid: 'An Electron application with Solid',
  'solid-ts': 'An Electron application with Solid and TypeScript'
}

function getCodeExtensionLink(name, itemName) {
  return `[${name}](https://marketplace.visualstudio.com/items?itemName=${itemName})`
}

function getRecommendedIDESetup(template) {
  const vscodeLink = '[VSCode](https://code.visualstudio.com/)'
  const eslintLink = getCodeExtensionLink('ESLint', 'dbaeumer.vscode-eslint')
  const prettierLink = getCodeExtensionLink('Prettier', 'esbenp.prettier-vscode')
  const links = [vscodeLink, eslintLink, prettierLink]
  if (template === 'vue') {
    links.push(getCodeExtensionLink('Volar', 'Vue.volar'))
  }
  if (template === 'vue-ts') {
    links.push(getCodeExtensionLink('Volar', 'Vue.volar'))
    links.push(
      getCodeExtensionLink('TypeScript Vue Plugin (Volar)', 'Vue.vscode-typescript-vue-plugin')
    )
  }
  if (template === 'svelte' || template === 'svelte-ts') {
    links.push(getCodeExtensionLink('Svelte', 'svelte.svelte-vscode'))
  }
  return links.join(' + ')
}

module.exports = (projectTemplate, packageName, packageManager) => {
  const description = descriptions[projectTemplate]

  return `# ${packageName}

${description}

## Recommended IDE Setup

- ${getRecommendedIDESetup(projectTemplate)}

## Project Setup

### Install

\`\`\`bash
$ ${getCommand(packageManager, 'install')}
\`\`\`

### Development

\`\`\`bash
$ ${getCommand(packageManager, 'dev')}
\`\`\`

### Build

\`\`\`bash
# For windows
$ ${getCommand(packageManager, 'build:win')}

# For macOS
$ ${getCommand(packageManager, 'build:mac')}

# For Linux
$ ${getCommand(packageManager, 'build:linux')}
\`\`\`
`
}
