import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import dedent from 'ts-dedent'

beforeAll(() => {
    execSync('tsx ../../src/bin build', { cwd: __dirname })
})

test('production', () => {
    expect(readFileSync(join(__dirname, './dist/index.cjs'), 'utf-8')).toBe(dedent`
        'use strict';

        console.log('hello world');

    `)
    expect(readFileSync(join(__dirname, './dist/index.mjs'), 'utf-8')).toBe(`console.log('hello world');\n`)
    expect(readFileSync(join(__dirname, './dist/global.min.js'), 'utf-8')).toBe(`console.log("hello world");\n`)
})

test('development', () => {
    expect(readFileSync(join(__dirname, './dist/index.development.cjs'), 'utf-8')).toBe(dedent`
        'use strict';

        function startDebug() {
            console.log('start debug');
        }

        {
            startDebug();
        }
        console.log('hello world');

    `)
    expect(readFileSync(join(__dirname, './dist/index.development.mjs'), 'utf-8')).toBe(dedent`
        function startDebug() {
            console.log('start debug');
        }

        {
            startDebug();
        }
        console.log('hello world');

    `)
})