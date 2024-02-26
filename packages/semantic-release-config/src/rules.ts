import { commits } from 'techor-conventional-commits'

export default [
    { breaking: true, release: 'major' },
    { revert: true, release: 'patch' },
    ...JSON.parse(JSON.stringify(commits))
        .map((eachReleaseRule) => {
            delete eachReleaseRule.group
            return eachReleaseRule
        })
]
