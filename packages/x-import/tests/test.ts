import xImport from '../src'

it('import .ts in .js', () => {
    expect(
        xImport('./foo.ts', { cwd: __dirname })
    ).toEqual({ 'bar': 'bar', 'foo': 'foo' })
})

it('read config from file', () => {
    expect(
        xImport('home-config.ts', { cwd: __dirname }))
        .toEqual({
            'default': {
                'classes': { 'btn': 'font:12' },
                'colors': {
                    'red': { '50': '#ff0000' }
                }
            }
        })
})

it('read config with third-party deps', () => {
    expect(
        xImport('external.ts', { cwd: __dirname }).default
    )
        .toBeDefined()
})

it('read aron.ts with esbuild svelte', () => {
    expect(
        xImport('aron.ts', { cwd: __dirname })
    )
        .toBeDefined()
})

it('read non-existent file', () => {
    expect(
        xImport('idontexist.ts', { cwd: __dirname })
    )
        .toBeUndefined()
})