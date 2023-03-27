import { execSync } from 'node:child_process'
import { expectExist } from '../../../../utils/expect-exist'

test('resolve `.tsx` with `package.json`', () => {
    execSync('../../dist/bin/index pack --shakable', { cwd: __dirname, stdio: 'pipe' })
    expectExist(['dist/cjs/index.js'])
})