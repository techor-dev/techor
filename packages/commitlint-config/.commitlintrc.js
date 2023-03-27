const { types } = require('techor-conventional-commits')

module.exports = {
    parserPreset: './parser-preset',
    rules: {
        'subject-exclamation-mark': [2, 'never'],
        'header-case': [2, 'always', 'sentence-case'],
        'body-leading-blank': [1, 'always'],
        'footer-leading-blank': [1, 'always'],
        'scope-case': [2, 'always', 'sentence-case'],
        'subject-case': [
            2,
            'always',
            ['sentence-case'],
        ],
        'subject-full-stop': [2, 'never', '.'],
        'type-case': [2, 'always', 'sentence-case'],
        'type-enum': [
            2,
            'always',
            types
        ]
    }
}