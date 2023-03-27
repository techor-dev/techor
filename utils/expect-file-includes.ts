import fs from 'fs'
import path from 'path'

export function expectFileIncludes(filePath: string, includes: string[], { cwd }) {
    const content = fs.readFileSync(path.join(cwd, filePath)).toString()
    includes.map((include) => {
        expect(content).toContain(include)
    })
}