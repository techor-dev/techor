import { execSync } from 'node:child_process'
import { expectExist } from '../../../../utils/expect-exist'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

beforeAll(() => {
    execSync('tsx ../../src/bin build', { cwd: __dirname, stdio: 'pipe' })
})

test('App', () => {
    expect(readFileSync(join(__dirname, './dist/App.mjs'), 'utf-8')).toContain('React.createElement("h1", null, "Hello, World!")')
})