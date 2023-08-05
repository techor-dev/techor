const configure = require('semantic-release-config-techor/configure')

module.exports = configure({
    packageManager: 'pnpm',
    plugins: {
        '@semantic-release/exec': {
            prepareCmd: 'pnpm run version ${nextRelease.version}'
        }
    }
})