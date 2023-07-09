import { execSync } from 'node:child_process'
import dedent from 'ts-dedent'
import fs from 'fs'
import path from 'path'

beforeAll(() => {
    execSync('tsx ../../../techor/src/bin pack', { cwd: __dirname, stdio: 'pipe' })
})

it('generates declarations', () => {
    expect(fs.readFileSync(path.join(__dirname, 'dist/index.d.ts')).toString()).toEqual(dedent`
        export default class Person {
            readonly name: string;
            readonly age: number;
            constructor(name: string, age: number);
            sex: string;
            weight: number;
            height: number;
        }\n
    `)
})