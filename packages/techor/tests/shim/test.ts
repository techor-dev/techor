import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

beforeAll(() => {
    execSync('tsx ../../src/bin build src/**/*.ts --formats esm', { cwd: __dirname })
    execSync('tsx ../../src/bin build src/minify.ts --formats esm -o dist/minify.min.mjs --no-clean', { cwd: __dirname })
})

it('should shim __filename in esm', () => {
    expect(readFileSync(join(__dirname, './dist/filename.mjs'), 'utf-8'))
        .toContain([
            `import __url_for_shim from 'url';`,
            `const __filename = __url_for_shim.fileURLToPath(import.meta.url);`
        ].join('\n'))
})

it('should shim __dirname in esm', () => {
    expect(readFileSync(join(__dirname, './dist/dirname.mjs'), 'utf-8'))
        .toContain([
            `import __url_for_shim from 'url';`,
            `import __path_for_shim from 'path';`,
            `const __filename = __url_for_shim.fileURLToPath(import.meta.url);`,
            `const __dirname = __path_for_shim.dirname(__filename);`
        ].join('\n'))
})

it('should shim require() in esm', () => {
    expect(readFileSync(join(__dirname, './dist/require.mjs'), 'utf-8'))
        .toContain([
            `import __mod_for_shim from 'module';`,
            `const require = __mod_for_shim.createRequire(import.meta.url);`
        ].join('\n'))
})

it('should detect manual shim in esm', () => {
    expect(readFileSync(join(__dirname, './dist/manual.mjs'), 'utf-8'))
        .not.toContain([
            `__url_for_shim`,
            `__path_for_shim`,
            `__mod_for_shim;`
        ].join('\n'))
})

it('should keep the shebang in the final chunk', () => {
    expect(readFileSync(join(__dirname, './dist/shebang.mjs'), 'utf-8')).toContain('#!/usr/bin/env node\n')
})

it('should minimize auto-filling of shims', () => {
    expect(readFileSync(join(__dirname, './dist/minify.min.mjs'), 'utf-8')).toContain(
        [
            '#!/usr/bin/env node',
            'import r from"url";import e from"path";import m from"module";let o=r.fileURLToPath(import.meta.url),t=e.dirname(o),i=m.createRequire(import.meta.url),a=o,p=t,l=i("./a");export{a,p as b,l as c};'
        ].join('\n')
    )
})