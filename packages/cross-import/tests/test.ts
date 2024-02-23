import crossImport from '../src'
import fs from 'fs'
import path from 'path'
import prettyBytes from 'pretty-bytes'

it('import .ts in .js', () => {
    expect(
        crossImport(path.resolve(__dirname, './foo.ts'))
    ).toEqual({
        'default': prettyBytes,
        'bar': 'bar',
        'foo': 'foo'
    })
})

it('read module from file', () => {
    expect(
        crossImport(path.resolve(__dirname, 'home-config.ts')))
        .toEqual({
            'default': {
                'classes': { 'btn': 'font:12' },
                'colors': {
                    'red': { '50': '#ff0000' }
                }
            }
        })
})

it('read module with export .css.ts', () => {
    expect(
        crossImport(path.resolve(__dirname, 'export.ts')))
        .toEqual({
            'default': {
                'colors': {
                    'red': { '50': '#ff0000' }
                }
            }
        })
})

it('read module with third-party deps', () => {
    expect(
        crossImport(path.resolve(__dirname, 'external.ts')).default
    )
        .toBeDefined()
})

it('read non-existent file', () => {
    expect(() => {
        crossImport(path.resolve(__dirname, 'idontexist.ts'))
    })
        .toThrowError()
})

// Do not test secondary imports in a test environment, inaccurate.