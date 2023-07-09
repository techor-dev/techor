import fg, { Options } from 'fast-glob'
import normalizeSource from './utils/normalize-source'

export default function explorePathSync(source: string | string[], options?: Options | undefined): string {
    return fg.sync(normalizeSource(source), options)[0]
}