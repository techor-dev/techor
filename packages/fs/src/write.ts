import fs from 'fs'
import path from 'path'

interface WriteToFileOptions {
    encoding?: null
    flag?: string
    cwd?: string
}

export function writeFileSync(filePath: string, data: string | NodeJS.ArrayBufferView, options?: WriteToFileOptions) {
    if (!filePath) return
    if (typeof data === 'object') {
        data = JSON.stringify(data)
    }
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true })
    }
    fs.writeFileSync(filePath, data, options)
}

export function writeJSONFileSync(filePath: string, data: any, options?: WriteToFileOptions) {
    if (!filePath || !data) return
    if (typeof data === 'object') {
        data = JSON.stringify(data)
    }
    writeFileSync(filePath, data, options)
}