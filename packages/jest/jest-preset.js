module.exports = {
    transform: {
        '^.+\\.(t|j)sx?$': [
            '@swc/jest',
            {
                jsc: {
                    target: 'es2021',
                },
            },
        ],
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    globals: {
        'ts-jest': {
            tsConfig: {
                importHelpers: true
            }
        }
    },
    transformIgnorePatterns: ['node_modules/(?!callsites)/']
}
