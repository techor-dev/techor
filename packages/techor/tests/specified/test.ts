import { execSync } from 'node:child_process'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'

it('force to bundle', () => {
    execSync('tsx ../../src/bin build src/index.ts --output.file dist/bundle.js --input.no-external', { cwd: __dirname, stdio: 'pipe' })
    expectFileIncludes('dist/bundle.js', ['This module cannot be imported from a Client Component module.'], { cwd: __dirname })
})