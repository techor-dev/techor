import fs from 'fs'
import extend from 'to-extend'
import upath from 'upath'

interface WriteToFileOptions {
    encoding?: null
    flag?: string
    cwd?: string
}

export function writeToFile(filePath: fs.PathOrFileDescriptor, data: any, options?: WriteToFileOptions) {
    if (!filePath) return
    options = extend({ cwd: process.cwd() }, options)
    filePath = upath.resolve(options.cwd, filePath)
    if (typeof data === 'object') {
        data = JSON.stringify(data)
    }
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(upath.dirname(filePath), { recursive: true })
    }
    fs.writeFileSync(filePath, data, options)
}