import { execSync } from 'node:child_process'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'
import { expectExist } from '../../../../utils/expect-exist'

it('force to bundle', () => {
    execSync('tsx ../../../techor/src/bin pack "src/index.ts" --outfile "dist/bundle.js" --bundle --no-external --declare', { cwd: __dirname, stdio: 'pipe' })
    expectFileIncludes('dist/bundle.js', ['throw new Error("This module cannot be imported from a Client Component module. It should only be used from a Server Component.");'], { cwd: __dirname })
    expectExist(['dist/bundle.d.ts'])
})