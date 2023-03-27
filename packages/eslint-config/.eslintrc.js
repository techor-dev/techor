module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        'linebreak-style': 0,
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
        '@typescript-eslint/ban-ts-comment': 'off'
    },
    ignorePatterns: [
        'dist'
    ]
}