import path from 'path'
import log from '@techor/log'
import extend from '@techor/extend'
import { explorePathSync } from '@techor/glob'
import crossImport from 'cross-import'

export default function exploreConfig(
    source: string | string[],
    options?: {
        cwd?: string,
        keys?: string[],
        on?: {
            found?: (foundPath: string) => void,
            notFound?: () => void
        }
    }
) {
    options = extend({
        keys: ['config', 'default'],
        on: {
            found: (foundPath: string) => log.ok`**${foundPath}** config file found`,
            notFound: () => log.i`No **${source}** config file found`
        }
    }, options)
    const { on, keys } = options
    let foundConfig: any
    const foundPath = explorePathSync(source, options)
    if (foundPath) {
        const foundConfigModule = crossImport(path.resolve(options.cwd || '', foundPath))
        for (const key of keys) {
            foundConfig = foundConfigModule[key]
            if (foundConfig) {
                break
            }
        }
        if (!foundConfig) {
            foundConfig = foundConfigModule
        }
        on.found?.(foundPath)
    } else {
        on.notFound?.()
    }
    return foundConfig
}