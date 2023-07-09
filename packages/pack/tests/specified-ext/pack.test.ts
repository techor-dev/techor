import { execSync } from 'node:child_process'
import { expectExist } from '../../../../utils/expect-exist'

test('specified ext `.js` by "main": "dist/index.js"', () => {
    execSync('tsx ../../../techor/src/bin pack', { cwd: __dirname, stdio: 'pipe' })
    expectExist(['dist/index.js'])
})