const { commits } = require('techor-conventional-commits')

module.exports = [
    { breaking: true, release: 'major' },
    { revert: true, release: 'patch' },
    ...JSON.parse(JSON.stringify(commits))
        .map((eachReleaseRule) => {
            delete eachReleaseRule.group
            return eachReleaseRule
        })
]