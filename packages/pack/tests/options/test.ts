import { execSync } from 'node:child_process'
import { expectFileExcludes } from '../../../../utils/expect-file-excludes'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'

it('mangle private', () => {
    execSync('tsx ../../src/bin pack --no-minify --shakable', { cwd: __dirname, stdio: 'pipe' })
    expectFileExcludes('dist/index.mjs', [
        '_fullAAAMembership'
    ], { cwd: __dirname })
})

it('tree shake and only bundle BBB', () => {
    execSync('tsx ../../src/bin pack src/tree-shaking.ts --no-minify --no-clean --shakable', { cwd: __dirname, stdio: 'pipe' })
    expectFileExcludes('dist/tree-shaking.mjs', [
        'AAA'
    ], { cwd: __dirname })
})