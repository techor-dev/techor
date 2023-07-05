import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import dedent from 'ts-dedent'

beforeAll(() => {
    execSync('tsx ../../src/bin pack --platform node --no-minify --external fake-external-package', { cwd: __dirname, stdio: 'inherit' })
})

it('prevent bundling dependencies and peerDependencies', () => {
    expect(readFileSync(join(__dirname, 'dist/index.bundle.js')).toString()).toContain('require("@techor/extend")')
    expect(readFileSync(join(__dirname, 'dist/index.bundle.js')).toString()).toContain('require("@techor/log")')
})

it('prevent bundling specified externals', () => {
    expect(readFileSync(join(__dirname, 'dist/index.bundle.js')).toString()).toContain('require("fake-external-package")')
})

// it('should not bundle `src/**/*` modules', () => {
//     expect(readFileSync(join(__dirname, 'dist/index.mjs')).toString()).toContain('export * from "./foo.mjs";')
//     expect(readFileSync(join(__dirname, 'dist/foo.mjs')).toString()).toContain(dedent`
//         var foo = "foo";
//         export {
//           foo
//         };
//     `)
// })