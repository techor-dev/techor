import { execSync } from 'node:child_process'
import { expectExist } from '../../../../utils/expect-exist'

it('build `bin` by `package.json`', () => {
    execSync('../../dist/bin/index pack', { cwd: __dirname, stdio: 'pipe' })
    expectExist(['dist/bin/index.js'])
})