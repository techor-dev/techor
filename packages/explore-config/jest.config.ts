/** @type {import('jest').Config} */
export default {
    preset: '@techor/jest',
    transformIgnorePatterns: [
        'node_modules/(?!callsites)/',
        /* should simulate real node runtime */
        'fixtures/'
    ]
}
