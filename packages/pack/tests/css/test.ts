import { expectFileIncludes } from '../../../../utils/expect-file-includes'
import { expectExist } from '../../../../utils/expect-exist'
import { execSync } from 'node:child_process'

test('extract css entries from `package.json`', () => {
    execSync('tsx ../../src/bin pack', { cwd: __dirname, stdio: 'pipe' })
    expectExist(['dist/index.css'])
    expectFileIncludes('dist/index.css', ['@import"heart";@import"float";'], { cwd: __dirname })
})