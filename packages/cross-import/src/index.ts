import { Transform, transform } from 'sucrase'
import { Module, createRequire } from 'module'
import { readFileSync } from 'fs'
import { runInThisContext } from 'vm'
import { dirname, join, parse } from 'path'

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
        const parsedModulePath = parse(modulePath)
        const sourceCode = readFileSync(modulePath, 'utf8').toString()
        const transforms: Transform[] = ['imports']
        if (parsedModulePath.ext === '.ts') {
            transforms.unshift('typescript')
        }
        const { code: moduleCode } = transform(sourceCode, {
            transforms,
            filePath: modulePath
        })
        const filename = join(parsedModulePath.dir, parsedModulePath.name + '.js')
        const mod = new Module(filename, module)
        mod.filename = filename
        mod.path = dirname(filename)
        mod.require = createRequire(filename)
        // Compile wrapped script
        const compiledModule = runInThisContext(Module.wrap(moduleCode), {
            filename
        })
        compiledModule(mod.exports, mod.require, mod, mod.filename, dirname(mod.filename))
        mod.loaded = true
        return mod.exports
    }
}