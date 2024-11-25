import { transform } from 'sucrase'
/**
 * Use the jiti/dist/jiti module to prevent bundling of redundant dependencies such as babel.
 */
import jiti from 'jiti/dist/jiti'

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
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        return require(modulePath)
    } catch (error) {
        if (process.env.DEBUG) {
            console.error(error)
            console.log('[cross-import] fall back to sucrase runtime transform:', modulePath)
        }
        return jiti(__filename, {
            cache: false,
            debug: !!process.env.DEBUG,
            onError(error) {
                throw error
            },
            transform: (options) => {
                return transform(options.source, {
                    transforms: ['imports', 'typescript'],
                    filePath: options.filename
                })
            }
        })(modulePath)
    }
}