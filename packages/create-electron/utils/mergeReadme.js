module.exports = (projectName, tempalte) => {
  const descriptions = {
    vanilla: 'A minimal Electron application',
    'vanilla-ts': 'A minimal Electron application with TypeScript',
    vue: 'An Electron application with Vue',
    'vue-ts': 'An Electron application with Vue and TypesSript',
    react: 'An Electron application with React',
    'react-ts': 'An Electron application with React and TypeScript',
    svelte: 'An Electron application with Svelte',
    'svelte-ts': 'An Electron application with Svelte and TypeScript'
  }
  const description = descriptions[tempalte]
  return `# ${projectName}

${description}

`
}
