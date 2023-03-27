import { execSync } from 'node:child_process'
import dedent from 'ts-dedent'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'

it('standard package outputs', () => {
    execSync('../../dist/bin/index pack --no-minify --shakable', { cwd: __dirname, stdio: 'pipe' })

    expectFileIncludes('dist/index.js', [
        'module.exports = __toCommonJS'
    ], { cwd: __dirname })

    expectFileIncludes('dist/index.mjs', [
        dedent`export {
          optionA,
          optionB
        };`
    ], { cwd: __dirname })

    expectFileIncludes('dist/cjs/index.js', [
        'module.exports = __toCommonJS(src_exports);'
    ], { cwd: __dirname })

    expectFileIncludes('dist/esm/index.mjs', [
        'export * from "./options/index.mjs";'
    ], { cwd: __dirname })


})