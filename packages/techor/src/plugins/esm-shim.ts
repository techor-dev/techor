import type { Plugin } from 'rollup'
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

export default function esmShim(): Plugin {
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
    } as Plugin
}