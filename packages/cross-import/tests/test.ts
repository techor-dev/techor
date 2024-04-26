import crossImport from '../src'
import path from 'path'
import { MasterCSS } from '@master/css'

it('import .ts in .js', () => {
    expect(
        crossImport(path.resolve(__dirname, 'fixtures/foo.ts'))
    ).toEqual({
        'default': MasterCSS,
        'bar': 'bar',
        'foo': 'foo'
    })
})

// it('read module from file', () => {
//     expect(
//         crossImport(path.resolve(__dirname, 'fixtures/home-config.ts')))
//         .toEqual({
//             'default': {
//                 'classes': { 'btn': 'font:12' },
//                 'colors': {
//                     'red': { '50': '#ff0000' }
//                 }
//             }
//         })
// })

// it('read module with export .css.ts', () => {
//     expect(
//         crossImport(path.resolve(__dirname, 'fixtures/export.ts')))
//         .toEqual({
//             'default': {
//                 'colors': {
//                     'red': { '50': '#ff0000' }
//                 }
//             }
//         })
// })

// it('read non-existent file', () => {
//     expect(() => {
//         crossImport(path.resolve(__dirname, 'fixtures/idontexist.ts'))
//     })
//         .toThrow()
// })

// it('read module with third-party deps', () => {
//     const configPath = path.join(__dirname, 'fixtures/config.tmp.js')
//     writeFileSync(configPath, 'module.exports = { a: 0 }')
//     const module1 = crossImport(configPath)
//     expect(module1).toEqual({ a: 0 })
// })

// Do not test secondary imports in a test environment, inaccurate.