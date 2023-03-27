import fs from 'fs'
import path from 'path'
const parentModuleDir = path.dirname(require.main.filename)

export function expectExist(filePaths: string[]) {
    filePaths.forEach((eachFilePath) => {
        const isExisting = fs.existsSync(path.join(parentModuleDir, eachFilePath))
        expect(isExisting ? eachFilePath : '').toBe(eachFilePath)
    })
}