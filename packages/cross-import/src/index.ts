import path from 'path'
import fg from 'fast-glob'
import extend from '@techor/extend'
import jiti from 'jiti'
import { transform } from 'sucrase'

export default function crossImport(
    source: string | fg.Pattern[],
    options?: fg.Options
): any {
    options = extend({ cwd: process.cwd() }, options)
    if (!source) return
    const filePath = fg.sync(source, options)[0]
    if (!filePath) return
    const resolvedFilePath = path.resolve(options.cwd, filePath)
    if (process.env.DEBUG) {
        console.log('[DEBUG: Cross Import] resolvedFilePath:', resolvedFilePath)
    }

    /** try to delete cache first */
    try {
        if (require.cache[resolvedFilePath]) {
            delete require.cache[resolvedFilePath]
            if (process.env.DEBUG) {
                console.log('[DEBUG: Cross Import] delete cache')
            }
        }
    } catch { /* empty */ }

    try {
        if (process.env.DEBUG) {
            console.log('[DEBUG: Cross Import] require')
        }
        return require(resolvedFilePath)
    } catch (error) {
        if (process.env.DEBUG) {
            console.log('[DEBUG: Cross Import] JITI')
            console.error(error)
        }
        return jiti(__filename, {
            interopDefault: true,
            cache: false,
            transform: (options) => {
                if (process.env.DEBUG) {
                    console.log('[DEBUG: Cross Import] JITI transform')
                    console.error(error)
                }
                return transform(options.source, {
                    transforms: ['imports', 'typescript'],
                })
            }
        })(resolvedFilePath)
    }
}

export { crossImport }