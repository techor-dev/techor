const configure = require('semantic-release-config-techor/configure')

module.exports = configure({
    plugins: {
        '@semantic-release/exec': {
            prepareCmd: 'npm run version ${nextRelease.version}'
        }
    }
})