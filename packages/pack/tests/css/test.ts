import { expectFileIncludes } from '../../../../utils/expect-file-includes'
import { expectExist } from '../../../../utils/expect-exist'
import { execSync } from 'node:child_process'

test('extract css entries from `package.json`', () => {
    execSync(`tsx ../../src/bin pack`, { cwd: __dirname, stdio: 'inherit' })
    expectExist(['dist/index.bundle.css'])
    expectFileIncludes('dist/index.bundle.css', ['@keyframes heart{0%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.3)}70%{transform:scale(1)}}@keyframes float{0%{transform:none}50%{transform:translateY(-1.25rem)}to{transform:none}}'], { cwd: __dirname })
})