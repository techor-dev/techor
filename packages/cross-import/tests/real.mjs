import crossImport from '../dist/index.mjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 測試 require cache 在真實 Node 環境運作時是否有被正確的清除
 */
const configPath = path.join(__dirname, 'config.tmp.js')

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

// ts
const tsConfigPath = path.join(__dirname, 'config.tmp.ts')

fs.writeFileSync(tsConfigPath, 'module.exports = { a: 0 }')
const tsModule1 = crossImport(tsConfigPath)
if (tsModule1.a !== 0) {
    throw new Error(`crossImport(${tsModule1}) module1.a !== 0`)
}

fs.writeFileSync(tsConfigPath, 'module.exports = { b: 0 }')
const tsModule2 = crossImport(tsConfigPath)
if (tsModule2.b !== 0) {
    throw new Error(`crossImport(${module1}) tsModule2.b !== 0`)
}

