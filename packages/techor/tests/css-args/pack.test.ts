import { execSync } from 'node:child_process'
import { expectExist } from '../../../../utils/expect-exist'

test('specify css entries', () => {
    execSync('../../dist/bin/index pack src/*.css', { cwd: __dirname, stdio: 'pipe' })
    expectExist(['dist/index.css', 'dist/float.css', 'dist/heart.css'])
})