import { createJiti } from 'jiti'

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
            console.log('[cross-import] fall back to jiti runtime transform:', modulePath)
        }
        return createJiti(__dirname, {
            cache: false,
            debug: !!process.env.DEBUG,
            fsCache: false,
            moduleCache: false,
        })(modulePath)
    }
}