import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import dedent from 'ts-dedent'

beforeAll(() => {
    execSync('tsx ../../src/bin build', { cwd: __dirname })
})

test('main', () => {
    expect(readFileSync(join(__dirname, './dist/index.cjs'), 'utf-8')).toContain(dedent`
    'use strict';

    function getUserName(name) {
        var displayName = name !== null && name !== void 0 ? name : 'Guest';
        return "Hello, ".concat(displayName, "!");
    }
    console.log(getUserName('JoyHe'));
    console.log(getUserName());`)
})