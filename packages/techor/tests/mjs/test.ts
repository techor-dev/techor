import { execSync } from 'node:child_process'
import { readFileAsNormalizedStrSync } from '../../../fs/src'
import { join } from 'node:path'
import dedent from 'ts-dedent'

beforeAll(() => {
    execSync(`tsx ../../src/bin pack "./src/**/*.ts" --no-minify --mangle-props "^_"`, { cwd: __dirname, stdio: 'inherit' })
})

it('mangle private', () => {
    expect(readFileAsNormalizedStrSync(join(__dirname, 'dist/index.mjs'))).not.toContain('_fullAAAMembership')
})

it('autofill mjs', () => {
    expect(readFileAsNormalizedStrSync(join(__dirname, 'dist/index.mjs'))).toContain(dedent`
        import { AAA, BBB } from "./components/index.mjs";
        import "server-only/default.js";
        export * from "./components/index.mjs";
    `)
    expect(readFileAsNormalizedStrSync(join(__dirname, 'dist/components/AAA.mjs'))).toContain('import { aUtil } from "../utils/a-util.mjs";')
})

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