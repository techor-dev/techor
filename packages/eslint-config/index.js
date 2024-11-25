/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const recommended = require('./recommended')

/** @type {import('@typescript-eslint/utils/ts-eslint').ClassicConfig} */
module.exports = {
    configs: {
        recommended
    },
    env: recommended.languageOptions.globals,
    overrides: [],
    parserOptions: {
        ecmaVersion: recommended.languageOptions.ecmaVersion,
        sourceType: recommended.languageOptions.sourceType
    },
    rules: recommended.rules,
    ignorePatterns: recommended.ignores,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
}