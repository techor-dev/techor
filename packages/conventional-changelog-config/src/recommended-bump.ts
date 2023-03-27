const parserOpts = require('./parser-opts')
const { commits: aronCommits } = require('techor-conventional-commits')

export default {
    parserOpts,
    whatBump: (commits) => {
        let level = null
        let majorCount = 0
        let MinorCount = 0
        let patchCount = 0
        commits.forEach(({ type }) => {
            const conventionalCommit = aronCommits.find(({ type: eachType }) => eachType === type)
            if (conventionalCommit) {
                switch (conventionalCommit.release) {
                    case 'major':
                        level = 0
                        majorCount++
                        break
                    case 'minor':
                        level = 1
                        MinorCount++
                        break
                    case 'patch':
                        level = 2
                        patchCount++
                        break
                }
            }
        })
        return {
            level: level,
            reason: `Major: ${majorCount}, Minor: ${MinorCount}, Patch: ${patchCount}`
        }
    }
}
