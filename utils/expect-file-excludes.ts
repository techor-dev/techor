import fs from 'fs'
import path from 'path'

export function expectFileExcludes(filePath: string, excludes: string[], { cwd }) {
    const content = fs.readFileSync(path.join(cwd, filePath)).toString()
    excludes.map((exclude) => {
        expect(content).not.toContain(exclude)
    })
}