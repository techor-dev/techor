import upath from 'upath'
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
    const resolvedFilePath = upath.resolve(options.cwd, filePath)
    try {
        return require(resolvedFilePath)
    } catch {
        return jiti(__dirname, {
            interopDefault: true,
            transform: (options) => {
                return transform(options.source, {
                    transforms: ['imports', 'typescript'],
                })
            }
        })(resolvedFilePath)
    }
}

export { crossImport }