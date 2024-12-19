import { dirname, resolve } from 'path'
import exploreConfig from '../src'

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

it('read .ts ext config', () => {
    const config = exploreConfig(resolve(__dirname, './fixtures/master.css.ts'), { cwd: __dirname })
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