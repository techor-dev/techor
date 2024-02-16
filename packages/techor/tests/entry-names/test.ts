import { execSync } from 'node:child_process'
import path from 'path'
import { existsSync } from 'fs'

beforeAll(() => {
    execSync(`tsx ../../src/bin pack "src/**/*.ts" --format esm --bundle`, { cwd: __dirname, stdio: 'inherit' })
})

it('contains bundled files', () => {
    expect(existsSync(path.join(__dirname, 'dist/index.bundle.mjs'))).toBeDefined()
})