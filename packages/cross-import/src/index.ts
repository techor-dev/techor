import jiti from 'jiti/dist/jiti'
import { transform } from 'sucrase'

export default function crossImport(modulePath: string): any {
    if (!modulePath) return
    if (process.env.DEBUG) {
        console.log('[DEBUG] [Cross Import] modulePath:', modulePath)
    }
    /** try to delete cache first */
    try {
        if (require.cache[modulePath]) {
            delete require.cache[modulePath]
            if (process.env.DEBUG) {
                console.log('[DEBUG] [Cross Import] delete cache')
            }
        }
    } catch { /* empty */ }

    try {
        if (process.env.DEBUG) {
            console.log('[DEBUG] [Cross Import] require')
        }
        return require(modulePath)
    } catch (error) {
        if (process.env.DEBUG) {
            console.log('[DEBUG] [Cross Import] JITI')
            console.error(error)
        }
        try {
            return jiti(__filename, {
                interopDefault: true,
                cache: false,
                transform: (options) => {
                    if (process.env.DEBUG) {
                        console.log('[DEBUG] [Cross Import] JITI transform')
                        console.error(error)
                    }
                    return transform(options.source, {
                        transforms: ['imports', 'typescript'],
                    })
                }
            })(modulePath)
        } catch (error) {
            throw new Error(error)
        }
    }
}