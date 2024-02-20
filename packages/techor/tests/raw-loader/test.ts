import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

beforeAll(() => {
    execSync('tsx ../../src/bin build', { cwd: __dirname })
})

test('main', () => {
    expect(readFileSync(join(__dirname, './dist/index.mjs'), 'utf-8')).toContain('var a = "Hello World";')
})