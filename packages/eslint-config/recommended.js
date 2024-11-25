/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')

module.exports = {
    extends: [
        eslint.configs.recommended,
        tseslint.configs.recommended,
    ],
    languageOptions: {
        ecmaVersion: 'latest',
        globals: {
            node: true,
            browser: true,
            es2021: true,
            jest: true
        },
    },
    ignores: [
        'dist/**'
    ],
    rules: {
        'linebreak-style': 0,
        'no-case-declarations': 'off',
        indent: [
            'off',
            4
        ],
        quotes: [
            'error',
            'single',
            { allowTemplateLiterals: true }
        ],
        semi: [
            'error',
            'never'
        ],
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-expressions': 'off'
    }
}