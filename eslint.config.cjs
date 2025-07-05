// eslint.config.cjs
const js = require('@eslint/js')
const tseslint = require('typescript-eslint')
const next = require('eslint-plugin-next')
const prettier = require('eslint-plugin-prettier')

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  next.configs.recommended,
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
]
