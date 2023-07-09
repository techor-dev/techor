import { execSync } from 'node:child_process'
import { readFileAsNormalizedStrSync } from '../../../fs/src'
import { join } from 'node:path'

beforeAll(() => {
    execSync(`tsx ../../../techor/src/bin pack --no-minify --mangle-props '^_'`, { cwd: __dirname, stdio: 'inherit' })
})

it('mangle private', () => {
    expect(readFileAsNormalizedStrSync(join(__dirname, 'dist/index.bundle.mjs'))).not.toContain('_fullAAAMembership')
})

// it('no bundled file', () => {
//     expect(readFileAsNormalizedStrSync(join(__dirname, 'dist/tree-shaking.mjs'))).toContain(dedent`
//         import { BBB } from "../src/index.mjs";
//         console.log(BBB);\n
//     `)
// })

// it('bundled file and tree shaking', () => {
//     expect(readFileAsNormalizedStrSync(join(__dirname, 'dist/tree-shaking.bundle.mjs'))).toEqual(dedent`
//         // src/components/BBB.mts
//         var BBB = class {
//           name = "test";
//         };
        
//         // src/tree-shaking.mts
//         console.log(BBB);\n
//     `)
// })