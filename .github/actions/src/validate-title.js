const parser = require('conventional-commits-parser').sync
const conventionalCommits = require('techor-conventional-commits')
const conventionalChangelogConfig = require('conventional-changelog-techor')

module.exports = async function validateTitle(title) {

    const { parserOpts } = conventionalChangelogConfig
    const result = parser(title, parserOpts)

    if (!result.type) {
        throw new Error(
            `No release type found in pull request title "${title}".` +
            '\n\nAdd a prefix like "Fix: ", "Feat: " to indicate what kind of release this pull request corresponds to. The title should match the commit mesage format as specified by https://github.com/techor-dev/techor/tree/main/packages/conventional-commits.'
        )
    }

    const allowedTypes = conventionalCommits.types
    if (!allowedTypes.includes(result.type)) {
        throw new Error(
            `Unknown release type "${result.type}" found in pull request title "${title}".` +
            `\n\nPlease use one of these recognized types: ${allowedTypes.join(
                ', '
            )}.`
        )
    }
}
