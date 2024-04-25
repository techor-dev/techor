/** @type {import('jest').Config} */
export default {
    preset: '@techor/jest',
    transform: {
        '^.+\\.(t|j)sx?$': [
            '@swc/jest'
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!callsites)/'],
    extensionsToTreatAsEsm: []
}
