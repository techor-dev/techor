const commits = [
    { type: 'Bump', scope: 'Major', release: 'major' },
    { type: 'Bump', scope: 'Minor', release: 'minor' },
    { type: 'Bump', scope: 'Patch', release: 'patch' },

    { type: 'Feat', release: 'minor', group: 'New Features' },
    { type: 'New', release: 'minor', group: 'New Features' },

    { type: 'Perf', release: 'patch', group: 'Performance Upgrades' },

    { type: 'Add', release: 'patch', group: 'Additions' },

    { type: 'Update', release: 'patch', group: 'Updates' },

    { type: 'Improve', release: 'patch', group: 'Improvements' },

    { type: 'Fix', release: 'patch', group: 'Bug Fixes' },

    { type: 'Depreciate', release: 'patch', group: 'Deprecations' },
    { type: 'Drop', release: 'patch', group: 'Deprecations' },

    { type: 'Docs', release: false, group: 'Documentation' },
    { type: 'Docs', scope: 'README', release: 'patch' },

    { type: 'Upgrade', release: 'patch', group: 'Upgrades' },

    { type: 'Revert', release: 'patch', group: 'Reversions' },

    { type: 'Example', release: false, group: 'Examples' },

    { type: 'Test', release: false, group: 'Tests' },

    { type: 'Refactor', release: false, hidden: false },
    { type: 'Chore', release: false, hidden: false },
    { type: 'Misc', release: false, hidden: false }
]

const types = [
    ...new Set(commits.map(({ type }) => type))
]

export {
    commits,
    types
}