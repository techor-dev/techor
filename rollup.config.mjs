import swc from '@rollup/plugin-swc'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { readFileSync } from 'fs'
import { createFilter } from '@rollup/pluginutils'
import { extname } from 'path'

const raw = (pattern) => [
    createFilter(pattern),
    {
        name: 'raw-loader',
        load(id) {
            if (id.endsWith(extname(pattern))) {
                return `export default \`${readFileSync(id, 'utf-8')}\`;`
            }
            return null
        }
    }
]

import MagicString from 'magic-string'

export const ESM_SHIM_CODE = `
/* Techor ESM Shim */
import __url_for_shim from 'url';
import __path_for_shim from 'path';
import __mod_for_shim from 'module';
const __filename = __url_for_shim.fileURLToPath(import.meta.url);
const __dirname = __path_for_shim.dirname(__filename);
const require = __mod_for_shim.createRequire(import.meta.url);\n
`

function esmShim() {
    return {
        name: 'techor-esm-shim',
        renderChunk(code, chunk, options) {
            if (options.format === 'es' && !code.includes(ESM_SHIM_CODE) && /__filename|__dirname|require\(|require\.resolve\(/.test(code)) {
                const str = new MagicString(code)
                /* insert ESM_SHIM_CODE after the something like:
                 * #!/usr/bin/env node
                */
                if (code.startsWith('#!')) {
                    str.prependRight(code.indexOf('\n') + 1, ESM_SHIM_CODE)
                } else {
                    str.prepend(ESM_SHIM_CODE)
                }
                return {
                    code: str.toString(),
                    map: str.generateMap()
                }
            }
            return null
        },
    }
}

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'))

const DEFAULT_EXTENSIONS = [
    '.ts',
    '.tsx',
    '.mjs',
    '.cjs',
    '.js',
    '.jsx',
    '.json',
]

export default function defineConfig(options = {}) {
    return {
        input: 'src/index.ts',
        output: [
            { file: 'dist/index.cjs', format: 'cjs' },
            { file: 'dist/index.mjs', format: 'esm' }
        ],
        plugins: [
            swc(),
            commonjs({
                extensions: ['.js', '.ts'],
                ...options.commonjs
            }),
            nodeResolve({
                extensions: DEFAULT_EXTENSIONS,
                exportConditions: ['node', 'import', 'require', 'default']
            }),
            esmShim(),
            raw('**/*.hbs')
        ],
        external: [
            ...Object.keys(pkg.dependencies || {}),
            ...Object.keys(pkg.peerDependencies || {}),
            ...Object.keys(pkg.optionalDependencies || {})
        ]
    }
}