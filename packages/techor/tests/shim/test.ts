import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ESM_SHIM_CODE } from '../../src/plugins/esm-shim'

beforeAll(() => {
    execSync('tsx ../../src/bin build', { cwd: __dirname })
})

it('contains ESM shim code in ESM', () => {
    expect(readFileSync(join(__dirname, './dist/index.mjs'), 'utf-8')).toContain(ESM_SHIM_CODE)
})

it('should not contain ESM shim code in CJS', () => {
    expect(readFileSync(join(__dirname, './dist/index.cjs'), 'utf-8')).not.toContain(ESM_SHIM_CODE)
})

it('starts with #!', () => {
    expect(readFileSync(join(__dirname, './dist/index.cjs'), 'utf-8').startsWith('#!')).toBeTruthy()
    expect(readFileSync(join(__dirname, './dist/index.mjs'), 'utf-8').startsWith('#!')).toBeTruthy()
})

