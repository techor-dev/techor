import configure from '../configure'
import releaseRules from '../rules'
import defaultConfig from '../config'

test('Customize config and extend default', () => {
    expect(configure()).toEqual({
        ...defaultConfig,
        plugins: [
            ['@semantic-release/commit-analyzer', { preset: 'techor', releaseRules }],
            ['@semantic-release/release-notes-generator', { preset: 'techor' }],
            ['@semantic-release/exec', {
                verifyReleaseCmd: 'techor version ${nextRelease.version}'
            }],
            '@semantic-release/github'
        ]
    })
})

test('Disable the @semantic-release/github plugin', () => {
    expect(configure({
        plugins: {
            '@semantic-release/github': false
        }
    })).toEqual({
        ...defaultConfig,
        plugins: [
            ['@semantic-release/commit-analyzer', { preset: 'techor', releaseRules }],
            ['@semantic-release/release-notes-generator', { preset: 'techor' }],
            ['@semantic-release/exec', {
                verifyReleaseCmd: 'techor version ${nextRelease.version}'
            }]
        ]
    })
})