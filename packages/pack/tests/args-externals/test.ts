import { execSync } from 'node:child_process'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'

test('prevent bundling external packages by args', () => {
    execSync('tsx ../../../techor/src/bin pack --external @master/css @master/style-element.react --bundle', { cwd: __dirname, stdio: 'inherit' })
    expectFileIncludes('dist/index.js', [
        'require("@master/css")',
        'require("@master/style-element.react")'
    ], { cwd: __dirname })
})