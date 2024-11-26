/* eslint-disable no-undef */
const parser = require('@typescript-eslint/parser')
const eslintPlugin = require('@typescript-eslint/eslint-plugin')

/** @type {import('eslint').Config} */
module.exports = {
    languageOptions: {
        parser,
        parserOptions: {
            projectService: true,
            tsconfigRootDir: __dirname,
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
    plugins: {
        '@typescript-eslint': eslintPlugin,
    },
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']
}