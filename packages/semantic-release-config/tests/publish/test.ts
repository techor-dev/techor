import configure from '../../src/configure'

it('only publishs the public packages', () => {
    process.chdir('./tests/publish')
    const config: any = configure()
    expect(config.plugins.filter((eachPlugin) => eachPlugin[0] === '@semantic-release/npm'))
        .toEqual([
            ['@semantic-release/npm', { 'pkgRoot': 'public' }]
        ])
})