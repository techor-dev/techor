import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

beforeAll(() => {
    execSync('tsx ../../src/bin build', { cwd: __dirname })
})

test('main', () => {
    expect(existsSync(join(__dirname, './dist/index.cjs'))).toBe(true)
    expect(readFileSync(join(__dirname, './dist/index.cjs'), 'utf-8')).toContain('module.exports = main;')
})

test('module', () => {
    expect(existsSync(join(__dirname, './dist/index.mjs'))).toBe(true)
    expect(readFileSync(join(__dirname, './dist/index.mjs'), 'utf-8')).toContain('export { main as default };')
})

test('browser', () => {
    expect(existsSync(join(__dirname, './dist/index.js'))).toBe(true)
    expect(readFileSync(join(__dirname, './dist/index.js'), 'utf-8')).toContain('(function () {')
})