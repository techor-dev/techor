import { execSync } from 'node:child_process'
import path from 'path'
import { readFileSync } from 'node:fs'

beforeAll(() => {
    execSync('tsx ../../src/bin build', { cwd: __dirname })
})

it('contains bundled files', () => {
    expect(readFileSync(path.join(__dirname, 'dist/index.mjs')).toString()).toContain('function prettyBytes(number, options)')
})

// it('contains multiple entries for tree shaking', () => {
//     expect(readFileSync(path.join(__dirname, 'dist/index.js')).toString()).toContain('module.exports = __toCommonJS(src_exports);')
//     expect(readFileSync(path.join(__dirname, 'dist/index.mjs')).toString()).toContain('export * from "./options/index.mjs";')
// })

// it('`./options/index` contains `./options/a` and `./options/b`', () => {
//     expect(readFileSync(path.join(__dirname, 'dist/options/index.js')).toString()).toContain('require("./a")')
//     expect(readFileSync(path.join(__dirname, 'dist/options/index.js')).toString()).toContain('require("./b")')
//     expect(readFileSync(path.join(__dirname, 'dist/options/index.mjs')).toString()).toContain('export * from "./a.mjs";')
//     expect(readFileSync(path.join(__dirname, 'dist/options/index.mjs')).toString()).toContain('export * from "./b.mjs";')
// })

// it('keep output file structure', () => {
//     expect(readFileSync(path.join(__dirname, 'dist/external/index.mjs')).toString()).toContain('import { internalA } from "../internal/a.mjs";')
// })

// it('always bundles devDependencies even if the entry is not with `--bundle`', () => {
//     expect(readFileSync(path.join(__dirname, 'dist/dev-deps.mjs')).toString()).not.toContain('import prettyBytes from "pretty-bytes";')
//     expect(readFileSync(path.join(__dirname, 'dist/dev-deps.js')).toString()).not.toContain('var import_pretty_bytes = __toESM(require("pretty-bytes"));')
//     expect(readFileSync(path.join(__dirname, 'dist/external/index.mjs')).toString()).not.toContain('from "./dev-dependency-foo.mjs"')
//     expect(readFileSync(path.join(__dirname, 'dist/external/index.mjs')).toString()).not.toContain('import { devDependencyFoo } from "@test/dev-dependency"')
// })

// it('should not contain internal modules of external `execa`', () => {
//     expect(readFileSync(path.join(__dirname, 'dist/external/index.js')).toString()).not.toContain('require("./lib/parse")')
// })

// it('cjs bundle should be same as esbuild', () => {
//     execSync('esbuild src/index.ts --bundle --outfile=esbuild-dist/index.js --format=cjs --platform=node --external:@techor/log --external:@techor/extend', { cwd: __dirname, stdio: 'pipe' })
//     expect(readFileSync(path.join(__dirname, 'dist/index.js')).toString()).toEqual(readFileSync(path.join(__dirname, 'esbuild-dist/index.js')).toString())
// })

// it('esm bundle should be same as esbuild', () => {
//     execSync('esbuild src/index.ts --bundle --outfile=esbuild-dist/index.mjs --format=esm --platform=node --external:@techor/log --external:@techor/extend', { cwd: __dirname, stdio: 'pipe' })
//     expect(readFileSync(path.join(__dirname, 'dist/index.mjs')).toString()).toEqual(readFileSync(path.join(__dirname, 'esbuild-dist/index.mjs')).toString())
// })
