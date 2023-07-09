import { WriteToFileOptions } from './options'
import writeFileSync from './write-file-sync'

export default function writeJSONFileSync(filePath: string, data: any, options?: WriteToFileOptions) {
    if (!filePath || !data) return
    if (typeof data === 'object') {
        data = JSON.stringify(data)
    }
    writeFileSync(filePath, data, options)
}