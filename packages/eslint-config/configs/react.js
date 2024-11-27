const reactPlugin = require('eslint-plugin-react')
const reactHooksPlugin = require('eslint-plugin-react-hooks')

/** @type {import('eslint').Linter.Config} */
module.exports = {
    ...reactPlugin.configs.flat.recommended,
    rules: {
        ...reactPlugin.configs['jsx-runtime'].rules,
        ...reactHooksPlugin.configs.recommended.rules,
        'react/display-name': 'off'
    },
    plugins: {
        'react': reactPlugin,
        'react-hooks': reactHooksPlugin,
    },
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
}
