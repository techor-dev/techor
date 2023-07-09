import { execSync } from 'node:child_process'
import fs from 'fs'
import path from 'path'

beforeAll(() => {
    execSync(`tsx ../../../techor/src/bin pack 'src/**/*.ts' --format esm --bundle`, { cwd: __dirname, stdio: 'inherit' })
})

it('contains bundled files', () => {
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.bundle.mjs')).toString()).toBeDefined()
})