import { transform } from 'sucrase'
import { Module, createRequire } from 'module'
import { readFileSync } from 'fs'
import { runInThisContext } from 'vm'
import { dirname } from 'path'

export default function crossImport(modulePath: string): any {
    if (!modulePath) return
    /** try to delete cache first */
    try {
        if (require.cache[modulePath]) {
            delete require.cache[modulePath]
            if (process.env.DEBUG) console.log('[cross-import] cache deleted')
        }
    } catch { /* empty */ }
    try {
        if (process.env.DEBUG) console.log('[cross-import] require:', modulePath)
        return require(modulePath)
    } catch (error) {
        if (process.env.DEBUG) {
            console.error(error)
            console.log('[cross-import] fall back to sucrase runtime transform:', modulePath)
        }
        const { code: moduleCode } = transform(readFileSync(modulePath, 'utf8').toString(), {
            transforms: ['imports', 'typescript'],
        })
        const mod = new Module(__filename)
        mod.filename = __dirname
        mod.require = createRequire(__filename)
        mod.path = dirname(__filename)
        // Compile wrapped script
        const compiledModule = runInThisContext(Module.wrap(moduleCode), {
            filename: __filename,
            lineOffset: 0,
            displayErrors: false,
        })
        compiledModule(mod.exports, mod.require, mod, mod.filename, dirname(mod.filename))
        return mod.exports
    }
}