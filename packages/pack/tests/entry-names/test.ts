import { execSync } from 'node:child_process'
import path from 'path'
import { readFileAsNormalizedStrSync } from '../../../fs/src'

beforeAll(() => {
    execSync(`tsx ../../../techor/src/bin pack 'src/**/*.ts' --format esm --bundle`, { cwd: __dirname, stdio: 'inherit' })
})

it('contains bundled files', () => {
    expect(readFileAsNormalizedStrSync(path.join(__dirname, 'dist/index.bundle.mjs'))).toBeDefined()
})