import { Options } from './options'
import readFileAsNormalizedStrSync from './read-file-as-normalized-str-sync'

export default function readJSONFileSync(filepath: string, options?: Options): any {
    const str = readFileAsNormalizedStrSync(filepath, options)
    return str ? JSON.parse(str) : undefined
}
