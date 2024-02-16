import { execSync } from 'node:child_process'
import dedent from 'ts-dedent'
import path from 'path'
import { readFileAsNormalizedStrSync } from '../../../fs/src'

beforeAll(() => {
    execSync('tsx ../../src/bin pack --declare', { cwd: __dirname, stdio: 'pipe' })
})

it('generates declarations', () => {
    expect(readFileAsNormalizedStrSync(path.join(__dirname, 'dist/index.d.ts'))).toEqual(dedent`
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