import { execSync } from 'node:child_process'
import { expectFileExcludes } from '../../../../utils/expect-file-excludes'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'

it('mangle private', () => {
    execSync('../../dist/bin/index pack --no-minify --shakable', { cwd: __dirname, stdio: 'pipe' })
    expectFileExcludes('dist/esm/index.mjs', [
        '_fullAAAMembership'
    ], { cwd: __dirname })
})

it('tree shake and only bundle BBB', () => {
    execSync('../../dist/bin/index pack src/tree-shaking.ts --no-minify --no-clean --shakable', { cwd: __dirname, stdio: 'pipe' })
    expectFileExcludes('dist/esm/tree-shaking.mjs', [
        'AAA'
    ], { cwd: __dirname })
})