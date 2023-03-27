import { execSync } from 'node:child_process'
import { expectExist } from '../../../../utils/expect-exist'

test('specified ext `.js` by "main": "dist/index.js"', () => {
    execSync('../../dist/bin/index pack', { cwd: __dirname, stdio: 'pipe' })
    expectExist(['dist/index.js'])
})