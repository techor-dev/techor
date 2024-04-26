import { dirname } from 'path'
import exploreConfig from '../src'

const __dirname = dirname(new URL(import.meta.url).pathname)

it('read .js config', () => {
    const config = exploreConfig('./fixtures/master.css', { cwd: __dirname, extensions: ['js'] })
    expect(config).toEqual({
        extends: [
            {
                styles: {
                    card: 'inline-flex'
                }
            }
        ],
        colors: { primary: '#ff0' }
    })
})

it('read .ts config', () => {
    const config = exploreConfig('./fixtures/master.css', { cwd: __dirname, extensions: ['ts'] })
    expect(config).toEqual({
        extends: [
            {
                styles: {
                    card: 'inline-flex'
                }
            }
        ],
        colors: { primary: '#ff0' }
    })
})

it('read .mjs config', () => {
    const config = exploreConfig('./fixtures/master.css', { cwd: __dirname, extensions: ['mjs'] })
    expect(config).toEqual({
        extends: [
            {
                styles: {
                    card: 'inline-flex'
                }
            }
        ],
        colors: { primary: '#ff0' }
    })
})

it('cannot read config', () => {
    const config = exploreConfig('vite.config')
    expect(config).toBeUndefined()
})