import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import dedent from 'ts-dedent'

beforeAll(() => {
    execSync(`tsx ../../../techor/src/bin pack --no-minify --mangle-props '^_'`, { cwd: __dirname, stdio: 'pipe' })
})

it('mangle private', () => {
    expect(readFileSync(join(__dirname, 'dist/index.bundle.mjs')).toString()).not.toContain('_fullAAAMembership')
})

// it('no bundled file', () => {
//     expect(readFileSync(join(__dirname, 'dist/tree-shaking.mjs')).toString()).toContain(dedent`
//         import { BBB } from "../src/index.mjs";
//         console.log(BBB);\n
//     `)
// })

// it('bundled file and tree shaking', () => {
//     expect(readFileSync(join(__dirname, 'dist/tree-shaking.bundle.mjs')).toString()).toEqual(dedent`
//         // src/components/BBB.mts
//         var BBB = class {
//           name = "test";
//         };
        
//         // src/tree-shaking.mts
//         console.log(BBB);\n
//     `)
// })