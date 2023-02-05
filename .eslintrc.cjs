/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  parser: 'vue-eslint-parser',
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-airbnb-with-typescript',
    'plugin:unicorn/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    'unicorn/filename-case': [
      'error',
      {
        'cases': { 'kebabCase': true, 'pascalCase': true },
      }
    ],
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prevent-abbreviations': [
      'error',
      {
        'allowList': {
          'props': true
        }
      }
    ]
  },
}
