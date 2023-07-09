import { existsSync, mkdirSync, writeFileSync as nativeWriteFileSync } from 'fs'
import { dirname } from 'path'
import { WriteToFileOptions } from './options'

export default function writeFileSync(filePath: string, data: string | NodeJS.ArrayBufferView, options?: WriteToFileOptions) {
    if (!filePath) return
    if (typeof data === 'object') {
        data = JSON.stringify(data)
    }
    if (!existsSync(filePath)) {
        mkdirSync(dirname(filePath), { recursive: true })
    }
    nativeWriteFileSync(filePath, data, options)
}
