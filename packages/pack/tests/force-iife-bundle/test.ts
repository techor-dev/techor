import { execSync } from 'node:child_process'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'

it('force to bundle iife', () => {
    execSync('tsx ../../../techor/src/bin pack', { cwd: __dirname, stdio: 'pipe' })
    expectFileIncludes('dist/iife.bundle.js', ['(()=>{throw new Error("This module cannot be imported from a Client Component module. It should only be used from a Server Component.");})();'], { cwd: __dirname })
})