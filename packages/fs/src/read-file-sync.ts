import { existsSync, readFileSync as nativeReadFileSync } from 'fs'
import { Options } from './options'

export default function readFileSync(filepath: string, options?: Options): Buffer | string {
    if (!filepath) return
    return existsSync(filepath) ? nativeReadFileSync(filepath, options) : undefined
}