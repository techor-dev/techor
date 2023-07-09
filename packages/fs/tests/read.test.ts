import path from 'path'
import { readFileSync, readFileAsNormalizedStrSync, readJSONFileSync } from '../src'
import dedent from 'ts-dedent'

it('read one file', () => {
    expect(readFileAsNormalizedStrSync(path.resolve(__dirname, 'a.json')))
        .toEqual(dedent`
            {
                "name": "a"
            }
        `)
})

it('read non-existent file', () => {
    expect(readFileSync(path.resolve(__dirname, 'wefwef.txt')))
        .toBeUndefined()
})

it('read file as string', () => {
    expect(readFileAsNormalizedStrSync(path.resolve(__dirname, 'a.json')))
        .toEqual(dedent`
            {
                "name": "a"
            }
        `)
})

it('read json file', () => {
    expect(readJSONFileSync(path.resolve(__dirname, 'a.json')))
        .toEqual({ 'name': 'a' })
})