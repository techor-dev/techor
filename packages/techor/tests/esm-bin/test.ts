import { execSync } from 'node:child_process'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'

test('esm bin', () => {
    execSync('tsx ../../src/bin build', { cwd: __dirname })
    expectFileIncludes('dist/bin/index.mjs', [`import ora from 'ora';`], { cwd: __dirname })
})