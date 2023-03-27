import { execSync } from 'node:child_process'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'

test('prevent bundling external packages by args', () => {
    execSync('node ../../dist/bin/index pack --shakable --external @master/css @master/style-element.react', { cwd: __dirname, stdio: 'pipe' })
    expectFileIncludes('dist/cjs/index.js', [
        'require("@master/css")',
        'require("@master/style-element.react")'
    ],  { cwd: __dirname })
})