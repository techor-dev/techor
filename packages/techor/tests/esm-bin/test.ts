import { execSync } from 'node:child_process'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'

test('esm bin', () => {
    execSync('tsx ../../src/bin pack', { cwd: __dirname, stdio: 'inherit' })
    expectFileIncludes('dist/bin/index.mjs', ['import n from"ora";'], { cwd: __dirname })
})