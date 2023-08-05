const configure = require('semantic-release-config-techor/configure')

module.exports = configure({
    plugins: {
        '@semantic-release/exec': {
            prepareCmd: 'pnpm run version ${nextRelease.version}'
        }
    }
})