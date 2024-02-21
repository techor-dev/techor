import { execSync } from 'node:child_process'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'

test('prevent bundling external packages by args', () => {
    execSync('tsx ../../src/bin build --input.external @master/css --input.external @master/style-element.react', { cwd: __dirname })
    expectFileIncludes('dist/index.js', [
        'require(\'@master/css\')',
        'require(\'@master/style-element.react\')'
    ], { cwd: __dirname })
})