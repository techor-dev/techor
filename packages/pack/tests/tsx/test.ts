import { execSync } from 'node:child_process'
import { expectExist } from '../../../../utils/expect-exist'

test('resolve `.tsx` with `package.json`', () => {
    execSync('tsx ../../src/bin pack', { cwd: __dirname, stdio: 'pipe' })
    expectExist(['dist/index.js'])
})