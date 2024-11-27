const base = require('./configs/base')
const stylistic = require('./configs/stylistic')
const typescript = require('./configs/typescript')
const react = require('./configs/react')

/** @type {import('eslint').Linter.LegacyConfig} */
module.exports = {
    configs: {
        base,
        stylistic,
        typescript,
        react
    },
    env: {
        node: true,
        browser: true,
        es2021: true,
        jest: true
    },
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        ...stylistic.rules,
        ...typescript.rules
    },
    ignorePatterns: base.ignores,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
}