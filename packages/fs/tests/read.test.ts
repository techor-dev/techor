import { readFile, readFiles, readFileAsJSON, readFileAsStr } from '../src'
import dedent from 'ts-dedent'

it('read one file', () => {
    expect(readFile('a.*', { cwd: __dirname }).toString().replace(/(\r\n|\r|\n)/g, '\n'))
        .toEqual(dedent`
            {
                "name": "a"
            }
        `)
})

it('read files', () => {
    expect(readFiles(['{a,b}.json'], { cwd: __dirname }).toString().replace(/(\r\n|\r|\n)/g, '\n'))
        .toEqual(dedent`
            {
                "name": "a"
            },{
                "name": "b"
            }
        `)
})

it('read non-existent file', () => {
    expect(readFile('wefwef.txt', { cwd: __dirname }))
        .toBeUndefined()
})

it('read file as string', () => {
    expect(readFileAsStr('a.*', { cwd: __dirname }))
        .toEqual(dedent`
            {
                "name": "a"
            }
        `)
})

it('read json file', () => {
    expect(readFileAsJSON('a.*', { cwd: __dirname }))
        .toEqual({ 'name': 'a' })
})