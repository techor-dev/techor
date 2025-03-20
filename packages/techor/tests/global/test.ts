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
    expect(readFileSync(join(__dirname, './dist/global.min.js'), 'utf-8')).toContain('typeof(e={})')
})

it('should be minifined', () => {
    expect(readFileSync(join(__dirname, './dist/global.min.js'), 'utf-8')).toBe('var e;let l;console.log((l=typeof(e={}),null!==e&&("object"===l||"function"===l))),globalThis.effect1="created",globalThis.effect2="created";\n')
})

it('should not contain @swc/helpers', () => {
    expect(readFileSync(join(__dirname, './dist/global.min.js'), 'utf-8')).not.toContain('@swc/helpers')
})