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

module.exports = (projectTemplate, packageName, packageManager) => {
  const description = descriptions[projectTemplate]

  return `# ${packageName}

${description}

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

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
