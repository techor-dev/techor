import { execSync } from 'node:child_process'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'

test('prevent bundling deps and peerDeps by `package.json`', () => {
    execSync('tsx ../../src/bin pack --external fake-external-package', { cwd: __dirname, stdio: 'pipe' })
    expectFileIncludes('dist/index.js', [
        'require("@techor/extend")',
        'require("@techor/log")'
    ], { cwd: __dirname })
})