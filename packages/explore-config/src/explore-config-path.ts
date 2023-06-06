import fg, { Options, Pattern } from 'fast-glob'

export function exploreConfigPath(sources: Pattern | Pattern[], options?: Options) {
    return fg.sync(sources, options)[0]
}