/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/eslint-config-prettier'],
  rules: {
    'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
