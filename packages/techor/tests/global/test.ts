import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

beforeAll(() => {
    execSync('tsx ../../src/bin build', { cwd: __dirname })
})

it('generate iife format', () => {
    expect(readFileSync(join(__dirname, './dist/global.js'), 'utf-8')).toContain('(function () {')
})

it('should bundle all deps', () => {
    expect(readFileSync(join(__dirname, './dist/global.js'), 'utf-8')).toContain('function isObject(value)')
})

it('should be minifined', () => {
    expect(readFileSync(join(__dirname, './dist/global.min.js'), 'utf-8')).toBe('(()=>{(function(){"use strict";function c(t){const e=typeof t;return t!==null&&(e==="object"||e==="function")}console.log(c({foo:"bar"})),globalThis.effect1="created";function o(){globalThis.effect2="created"}o()})();})();\n')
})

