import { execSync } from 'node:child_process'
import dedent from 'ts-dedent'
import fs from 'fs'
import path from 'path'

beforeAll(() => {
    execSync('tsx ../../src/bin pack --platform node --no-minify', { cwd: __dirname, stdio: 'pipe' })
})

it('contains bundled files', () => {
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.bundle.js')).toString()).toContain('module.exports = __toCommonJS')
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.bundle.mjs')).toString()).toContain(dedent`
        export {
          excludeDevDeps,
          optionA,
          optionB
        };
    `)
})

it('contains multiple entries for tree shaking', () => {
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.js')).toString()).toContain('module.exports = __toCommonJS(src_exports);')
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.mjs')).toString()).toContain('export * from "./options/index.mjs";')
})

it('`./options/index` contains `./options/a` and `./options/b`', () => {
    expect(fs.readFileSync(path.join(__dirname, 'dist/options/index.js')).toString()).toContain('require("./a")')
    expect(fs.readFileSync(path.join(__dirname, 'dist/options/index.js')).toString()).toContain('require("./b")')
    expect(fs.readFileSync(path.join(__dirname, 'dist/options/index.mjs')).toString()).toContain('export * from "./a.mjs";')
    expect(fs.readFileSync(path.join(__dirname, 'dist/options/index.mjs')).toString()).toContain('export * from "./b.mjs";')
})

it('always bundles devDependencies even if the entry is not with `--bundle`', () => {
    expect(fs.readFileSync(path.join(__dirname, 'dist/dev-deps.mjs')).toString()).not.toContain('import prettyBytes from "pretty-bytes";')
    expect(fs.readFileSync(path.join(__dirname, 'dist/dev-deps.js')).toString()).not.toContain('var import_pretty_bytes = __toESM(require("pretty-bytes"));')
})

it('cjs bundle should be same as esbuild', () => {
    execSync('esbuild src/index.ts --bundle --outfile=esbuild-dist/index.bundle.js --format=cjs --platform=node --external:@techor/log --external:@techor/extend', { cwd: __dirname, stdio: 'pipe' })
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.bundle.js')).toString()).toEqual(fs.readFileSync(path.join(__dirname, 'esbuild-dist/index.bundle.js')).toString())
})

it('esm bundle should be same as esbuild', () => {
    execSync('esbuild src/index.ts --bundle --outfile=esbuild-dist/index.bundle.mjs --format=esm --platform=node --external:@techor/log --external:@techor/extend', { cwd: __dirname, stdio: 'pipe' })
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.bundle.mjs')).toString()).toEqual(fs.readFileSync(path.join(__dirname, 'esbuild-dist/index.bundle.mjs')).toString())
})
