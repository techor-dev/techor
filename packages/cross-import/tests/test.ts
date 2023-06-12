import crossImport from '../src'
import fs from 'fs'
import path from 'path'

it('import .ts in .js', () => {
    expect(
        crossImport('./foo.ts', { cwd: __dirname })
    ).toEqual({ 'bar': 'bar', 'foo': 'foo' })
})

it('read config from file', () => {
    expect(
        crossImport('home-config.ts', { cwd: __dirname }))
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
        crossImport('external.ts', { cwd: __dirname }).default
    )
        .toBeDefined()
})

it('read non-existent file', () => {
    expect(
        crossImport('idontexist.ts', { cwd: __dirname })
    )
        .toBeUndefined()
})

// Do not test secondary imports in a test environment, inaccurate.