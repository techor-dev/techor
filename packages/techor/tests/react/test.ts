import { execSync } from 'node:child_process'
import { expectExist } from '../../../../utils/expect-exist'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

beforeAll(() => {
    execSync('tsx ../../src/bin build "src/**/*.tsx"', { cwd: __dirname, stdio: 'pipe' })
})

test('App', () => {
    expect(readFileSync(join(__dirname, './dist/App.mjs'), 'utf-8')).toContain('React.createElement("h1", null, "Hello, World!")')
    expect(readFileSync(join(__dirname, './dist/App.mjs'), 'utf-8')).toContain(`import Client from './components/Client.mjs';`)
    expect(readFileSync(join(__dirname, './dist/App.mjs'), 'utf-8')).toContain(`import Server from './components/Server.mjs';`)
})

test('use client', () => {
    expect(readFileSync(join(__dirname, './dist/components/Client.cjs'), 'utf-8')).toContain('"use client"')
    expect(readFileSync(join(__dirname, './dist/components/Client.mjs'), 'utf-8')).toContain('"use client"')
})

test('use server', () => {
    expect(readFileSync(join(__dirname, './dist/components/Server.cjs'), 'utf-8')).toContain('"use server"')
    expect(readFileSync(join(__dirname, './dist/components/Server.mjs'), 'utf-8')).toContain('"use server"')
})