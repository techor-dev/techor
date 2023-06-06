import type { Options, Pattern } from 'fast-glob'
import { exploreConfigPath } from './explore-config-path'
import upath from 'upath'

export function exploreResolvedConfigPath(sources: Pattern | Pattern[], options?: Options) {
    const foundPath = exploreConfigPath(sources, options)
    return foundPath ? upath.resolve(options.cwd, foundPath) : ''
}