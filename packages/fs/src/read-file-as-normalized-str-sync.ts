import { Options } from './options'
import readFileSync from './read-file-sync'

export default function readFileAsNormalizedStrSync(filepath: string, options?: Options): string {
    const str = readFileSync(filepath, options)
    return str ? str.toString().replace(/(\r\n|\r|\n)/g, '\n') : undefined
}