import { execSync } from 'node:child_process'
import { readFileAsNormalizedStrSync } from '../../../fs/src'
import { join } from 'node:path'
import dedent from 'ts-dedent'

beforeAll(() => {
    execSync('tsx ../../../techor/src/bin pack --platform node --no-minify --external fake-external-package', { cwd: __dirname, stdio: 'inherit' })
})

it('prevent bundling dependencies and peerDependencies', () => {
    expect(readFileAsNormalizedStrSync(join(__dirname, 'dist/index.bundle.js'))).toContain('require("@techor/extend")')
    expect(readFileAsNormalizedStrSync(join(__dirname, 'dist/index.bundle.js'))).toContain('require("@techor/log")')
})

it('prevent bundling specified externals', () => {
    expect(readFileAsNormalizedStrSync(join(__dirname, 'dist/index.bundle.js'))).toContain('require("fake-external-package")')
})

// it('should not bundle `src/**/*` modules', () => {
//     expect(readFileAsNormalizedStrSync(join(__dirname, 'dist/index.mjs'))).toContain('export * from "./foo.mjs";')
//     expect(readFileAsNormalizedStrSync(join(__dirname, 'dist/foo.mjs'))).toContain(dedent`
//         var foo = "foo";
//         export {
//           foo
//         };
//     `)
// })