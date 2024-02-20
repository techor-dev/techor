import { execSync } from 'node:child_process'
import dedent from 'ts-dedent'
import path from 'path'
import { readFileAsNormalizedStrSync } from '../../../fs/src'

beforeAll(() => {
    execSync('tsx ../../src/bin build --declare', { cwd: __dirname, stdio: 'pipe' })
})

it('generates declarations', () => {
    expect(readFileAsNormalizedStrSync(path.join(__dirname, 'dist/index.d.ts'))).toEqual(dedent`
        export default class Person {
            constructor(name: string, age: number);
            sex: string;
            weight: number;
            height: number;
        }
        export { Foo } from './foo';
        export declare const person: Person;\n
    `)
})