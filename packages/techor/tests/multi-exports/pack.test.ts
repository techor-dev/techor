import { execSync } from 'node:child_process'
import { expectExist } from '../../../../utils/expect-exist'

it('exports multiple outputs', () => {
    execSync('tsx ../../src/bin build', { cwd: __dirname, stdio: 'pipe' })
    expectExist([
        'dist/browser/index.cjs',
        'dist/browser/index.js',
        'dist/browser/index.mjs',
        'dist/browser/index.d.ts',
        'dist/a.cjs',
        'dist/b.cjs',
        'dist/index.cjs',
        'dist/a.mjs',
        'dist/b.mjs',
        'dist/index.mjs',
        'dist/a.d.ts',
        'dist/b.d.ts',
        'dist/index.d.ts',
    ])
})