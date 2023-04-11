import crossImport from '../../src'
import fs from 'fs'
import path from 'path'

it('require without cache', () => {
    const configPath = path.join(__dirname, 'config-tmp.js')

    fs.writeFileSync(configPath, 'module.exports = { a: 0 }')
    expect(crossImport(configPath)).toEqual({ a: 0 })
    jest.resetModules()
    fs.writeFileSync(configPath, 'module.exports = { b: 0 }')
    expect(crossImport(configPath)).toEqual({ b: 0 })
})