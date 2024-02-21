import { execSync } from 'node:child_process'
import path from 'path'
import { existsSync } from 'fs'

beforeAll(() => {
    execSync(`tsx ../../src/bin build "src/**/*.ts" --formats esm -o dist/fuck.js`, { cwd: __dirname })
})

it('contains bundled files', () => {
    expect(existsSync(path.join(__dirname, 'dist/a.mjs'))).toBeDefined()
    expect(existsSync(path.join(__dirname, 'dist/b.mjs'))).toBeDefined()
    expect(existsSync(path.join(__dirname, 'dist/index.mjs'))).toBeDefined()
})