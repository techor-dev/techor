import { expectFileIncludes } from '../../../../utils/expect-file-includes'
import { expectExist } from '../../../../utils/expect-exist'
import { execSync } from 'node:child_process'

test('extract css entries from `package.json`', () => {
    execSync('../../dist/bin/index pack', { cwd: __dirname, stdio: 'pipe' })
    expectExist(['dist/index.css'])
    expectFileIncludes('dist/index.css', ['body{background-color:red}'],  { cwd: __dirname })
})