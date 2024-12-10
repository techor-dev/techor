const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const reactRefresh = require('eslint-plugin-react-refresh')

/** @type {import('eslint').Linter.Config} */
module.exports = {
    ...react.configs.flat.recommended,
    rules: {
        ...react.configs['jsx-runtime'].rules,
        ...reactHooks.configs.recommended.rules,
        'react/display-name': 'off'
    },
    plugins: {
        'react': react,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
    },
    files: ['**/*.{js,mjs,cjs,ts,cts,mts,jsx,mjsx,tsx,mtsx}'],
}
