import fs, { ObjectEncodingOptions } from 'fs'

declare type Options = ObjectEncodingOptions & { encoding?: BufferEncoding | null }

export function readFileSync(filepath: string, options?: Options): Buffer | string {
    if (!filepath) return
    return fs.existsSync(filepath) ? fs.readFileSync(filepath, options) : undefined
}

export function readFileAsNormalizedStrSync(filepath: string, options?: Options): string {
    const str = readFileSync(filepath, options)
    return str ? str.toString().replace(/(\r\n|\r|\n)/g, '\n') : undefined
}

export function readJSONFileSync(filepath: string, options?: Options): any {
    const str = readFileAsNormalizedStrSync(filepath, options)
    return str ? JSON.parse(str) : undefined
}
