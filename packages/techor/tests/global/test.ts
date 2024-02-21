import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

beforeAll(() => {
    execSync('tsx ../../src/bin build', { cwd: __dirname })
})

it('generate iife format', () => {
    expect(readFileSync(join(__dirname, './dist/global.js'), 'utf-8')).toContain('(function (isObject)')
})

it('should bundle all deps', () => {
    expect(readFileSync(join(__dirname, './dist/global.min.js'), 'utf-8')).toContain('function isObject(value)')
})

it('should be minifined', () => {
    expect(readFileSync(join(__dirname, './dist/global.min.js'), 'utf-8')).toBe('(function(){"use strict";function isObject(value){const type=typeof value;return value!==null&&(type==="object"||type==="function")}console.log(isObject({foo:"bar"}));globalThis.effect1="created";function effect2(){globalThis.effect2="created"}effect2()})();\n')
})

it('should not contain @swc/helpers', () => {
    expect(readFileSync(join(__dirname, './dist/global.min.js'), 'utf-8')).not.toContain('@swc/helpers')
})