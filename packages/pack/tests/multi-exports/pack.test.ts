import { execSync } from 'node:child_process'
import { expectExist } from '../../../../utils/expect-exist'

it('exports multiple outputs', () => {
    execSync('tsx ../../../techor/src/bin pack --declare', { cwd: __dirname, stdio: 'pipe' })
    expectExist([
        'dist/index.browser.js',
        'dist/index.browser.d.ts',
        'dist/index.d.ts',
        'dist/options.d.ts',
    ])
})