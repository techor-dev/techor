import configure from '../../configure'

it('only publishs the public packages', () => {
    process.chdir(__dirname)
    const config: any = configure()
    expect(config.plugins.filter((eachPlugin) => eachPlugin[0] === '@semantic-release/npm'))
        .toEqual([
            ['@semantic-release/npm', { 'pkgRoot': 'public' }]
        ])
})