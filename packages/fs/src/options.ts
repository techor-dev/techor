import { ObjectEncodingOptions } from 'fs'

export declare type Options = ObjectEncodingOptions & { encoding?: BufferEncoding | null }
export interface WriteToFileOptions {
    encoding?: null
    flag?: string
    cwd?: string
}