import eslintConfig from '@electron-toolkit/eslint-config'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginSvelte from 'eslint-plugin-svelte'

export default [
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  eslintConfig,
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    files: ['**/*.{jsx,svelte}'],
    rules: {
      'svelte/no-unused-svelte-ignore': 'off'
    }
  },
  eslintConfigPrettier
]
