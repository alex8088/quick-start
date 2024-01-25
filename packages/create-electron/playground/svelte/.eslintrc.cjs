module.exports = {
  parserOptions: {
    extraFileExtensions: ['.svelte']
  },
  extends: [
    'eslint:recommended',
    'plugin:svelte/recommended',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier'
  ],
  rules: {
    'svelte/no-unused-svelte-ignore': 'off'
  }
}
