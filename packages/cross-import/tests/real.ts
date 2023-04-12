import crossImport from '../src'
import fs from 'fs'
import path from 'path'

/**
 * 測試 require cache 在真實 Node 環境運作時是否有被正確的清除
 */
const configPath = path.join(__dirname, 'config-tmp.js')

fs.writeFileSync(configPath, 'module.exports = { a: 0 }')
const module1 = crossImport(configPath)
if (module1.a !== 0) {
    throw new Error(`crossImport(${module1}) module1.a !== 0`)
}

fs.writeFileSync(configPath, 'module.exports = { b: 0 }')
const module2 = crossImport(configPath)
if (module2.b !== 0) {
    throw new Error(`crossImport(${module1}) module2.b !== 0`)
}