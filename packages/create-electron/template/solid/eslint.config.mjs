import eslintConfig from '@electron-toolkit/eslint-config'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginSolid from 'eslint-plugin-solid'

export default [
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  eslintConfig,
  {
    files: ['**/*.{js,jsx}'],
    ...eslintPluginSolid.configs['flat/recommended']
  },
  eslintConfigPrettier
]
