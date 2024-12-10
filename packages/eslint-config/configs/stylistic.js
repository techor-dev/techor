/** @type {import('eslint').Linter.Config} */
module.exports = {
    rules: {
        'linebreak-style': 0,
        'no-case-declarations': 'off',
        'indent': ['off', 4],
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
        'semi': ['error', 'never']
    },
    files: ['**/*.{js,mjs,cjs,ts,cts,mts,jsx,mjsx,tsx,mtsx}'],
}