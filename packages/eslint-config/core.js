/* eslint-disable no-undef */
const typescript = require('@typescript-eslint/eslint-plugin')

module.exports = {
    rules: {
        ...typescript.configs['recommended'].rules,
        ...typescript.configs['strict'].rules,
        ...typescript.configs['stylistic'].rules,

        // stylistic
        'linebreak-style': 0,
        'no-case-declarations': 'off',
        'indent': ['off', 4],
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
        'semi': ['error', 'never'],

        // typescript-eslint
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-dynamic-delete': 'off',
    },
    ignores: [
        'dist/**'
    ]
}