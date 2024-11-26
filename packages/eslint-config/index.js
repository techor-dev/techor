/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const typescript = require('./configs/typescript')
const core = require('./core')

/** @type {import('@typescript-eslint/utils/ts-eslint').ClassicConfig} */
module.exports = {
    configs: {
        core,
        typescript
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
    rules: core.rules,
    ignorePatterns: core.ignores,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
}