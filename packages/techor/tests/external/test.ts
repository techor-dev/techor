import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

beforeAll(() => {
    execSync('tsx ../../src/bin build --external fake-external-package', { cwd: __dirname })
})

it('prevent bundling dependencies', () => {
    expect(readFileSync(join(__dirname, 'dist/index.cjs')).toString()).toContain(`require('@techor/extend')`)
})

it('prevent bundling peerDependencies', () => {
    expect(readFileSync(join(__dirname, 'dist/index.cjs')).toString()).toContain(`require('@techor/log')`)
})

it('prevent bundling wide module path', () => {
    expect(readFileSync(join(__dirname, 'dist/index.cjs')).toString()).toContain(`require('@techor/log/dist')`)
})

it('prevent bundling specified externals', () => {
    expect(readFileSync(join(__dirname, 'dist/index.cjs')).toString()).toContain(`require('fake-external-package')`)
})
