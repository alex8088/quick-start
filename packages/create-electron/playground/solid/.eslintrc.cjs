module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module',
    ecmaVersion: 2021
  },
  plugins: ['solid'],
  extends: ['eslint:recommended', 'plugin:solid/recommended', 'plugin:prettier/recommended']
}
