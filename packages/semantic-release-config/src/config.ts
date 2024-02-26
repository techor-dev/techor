import releaseRules from '../src/rules'

export default {
    branches: [
        '+([0-9])?(.{+([0-9]),x}).x',
        'main',
        'next',
        'next-major',
        { name: 'alpha', prerelease: true },
        { name: 'beta', prerelease: true },
        { name: 'rc', prerelease: true },
        { name: 'canary', prerelease: true }
    ],
    plugins: {
        '@semantic-release/commit-analyzer': { preset: 'techor', releaseRules },
        '@semantic-release/release-notes-generator': { preset: 'techor' },
        '@semantic-release/exec': {
            verifyReleaseCmd: 'techor version ${nextRelease.version}'
        },
        '@semantic-release/github': true
    }
}