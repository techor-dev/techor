import { execSync } from 'node:child_process'
import dedent from 'ts-dedent'
import fs from 'fs'
import path from 'path'

beforeAll(() => {
    execSync('tsx ../../src/bin pack --platform node --no-minify --shakable', { cwd: __dirname, stdio: 'pipe' })
    execSync('esbuild src/index.ts --bundle --outfile=esbuild-dist/index.bundle.js --format=cjs --platform=node --external:@techor/log --external:@techor/extend', { cwd: __dirname, stdio: 'pipe' })
    execSync('esbuild src/index.ts --bundle --outfile=esbuild-dist/index.bundle.mjs --format=esm --platform=node --external:@techor/log --external:@techor/extend', { cwd: __dirname, stdio: 'pipe' })
})

it('standard package outputs', () => {
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.bundle.js')).toString()).toContain('module.exports = __toCommonJS')
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.bundle.mjs')).toString()).toContain(dedent`
        export {
          optionA,
          optionB
        };
    `)
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.js')).toString()).toContain('module.exports = __toCommonJS(src_exports);')
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.mjs')).toString()).toContain('export * from "./options/index.mjs";')
})

it('cjs bundle should be same as esbuild', () => {
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.bundle.js')).toString()).toEqual(fs.readFileSync(path.join(__dirname, 'esbuild-dist/index.bundle.js')).toString())
})

it('esm bundle should be same as esbuild', () => {
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.bundle.mjs')).toString()).toEqual(fs.readFileSync(path.join(__dirname, 'esbuild-dist/index.bundle.mjs')).toString())
})
