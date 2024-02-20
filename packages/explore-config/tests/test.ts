import exploreConfig from '../src'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

it('read .js config', () => {
    const config = exploreConfig('master.css.js', { cwd: __dirname })
    expect(config).toEqual({ colors: { primary: '#ff0' } })
})

it('read .ts config', () => {
    const config = exploreConfig('master.css.ts', { cwd: __dirname })
    expect(config).toEqual({ colors: { primary: '#ff0' } })
})

it('read .mjs config', () => {
    const config = exploreConfig('master.css.mjs', { cwd: __dirname })
    expect(config).toEqual({ colors: { primary: '#ff0' } })
})

it('cannot read config', () => {
    const config = exploreConfig('vite.config.*')
    expect(config).toBeUndefined()
})