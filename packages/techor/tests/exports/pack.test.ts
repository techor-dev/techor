import { execSync } from 'node:child_process'
import { expectExist } from '../../../../utils/expect-exist'

it('exports', () => {
    execSync('tsx ../../src/bin pack', { cwd: __dirname, stdio: 'pipe' })
    expectExist([
        'dist/index.js',
    ])
})