import { execSync } from 'node:child_process'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'

test('prevent bundling deps and peerDeps by `package.json`', () => {
    execSync('node ../../dist/bin/index pack --extra-external fake-external-package', { cwd: __dirname, stdio: 'pipe' })
    expectFileIncludes('dist/index.js', [
        'require("@master/css")',
        'require("@master/style-element.react")'
    ], { cwd: __dirname })
})