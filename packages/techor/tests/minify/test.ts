import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

test('main', () => {
    execSync('tsx ../../src/bin build --minify', { cwd: __dirname })
    expect(readFileSync(join(__dirname, './dist/index.mjs'), 'utf-8').toString()).toEqual('function main(){console.log("main")}main();export{main as default};\n')
})