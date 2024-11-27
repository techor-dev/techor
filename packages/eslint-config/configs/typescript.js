const tseslint = require('typescript-eslint')
const ts = require('@typescript-eslint/eslint-plugin')

/** @type {import('eslint').Linter.Config} */
module.exports = {
    rules: {
        ...ts.configs['recommended'].rules,
        ...ts.configs['strict'].rules,
        ...ts.configs['stylistic'].rules,
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
        '@typescript-eslint/no-useless-constructor': 'off',
        '@typescript-eslint/no-empty-function': 'off',
    },
    plugins: {
        '@typescript-eslint': ts,
    },
    languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
            sourceType: 'module'
        },
        ecmaVersion: 'latest',
        globals: {
            node: true,
            browser: true,
            es2021: true,
            jest: true
        }
    },
    files: ['**/*.{ts,tsx,mts,cts}'],
}