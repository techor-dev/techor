import Techor from '../src'

it('read .js config', () => {
    const techor = new Techor({ config: 'master.css.js', cwd: __dirname })
    expect(techor.readConfig()).toEqual({ colors: { primary: '#ff0' } })
})

it('read .ts config', () => {
    const techor = new Techor({ config: 'master.css.ts', cwd: __dirname })
    expect(techor.readConfig()).toEqual({ colors: { primary: '#ff0' } })
})

it('read .mjs config', () => {
    const techor = new Techor({ config: 'master.css.mjs', cwd: __dirname })
    expect(techor.readConfig()).toEqual({ colors: { primary: '#ff0' } })
})

it('cannot read config', () => {
    const techor = new Techor({ config: 'vite.config.{js,mjs,cjs,ts}' })
    expect(techor.readConfig()).toBeUndefined()
})

it('can extend Techor', () => {
    const defaultOptions: any = {
        b: 0
    }

    class MyTechor extends Techor<any> {
        constructor(
            options: any
        ) {
            super(defaultOptions, options)
        }
    }
    const myTechor = new MyTechor({ a: 1 })
    expect(myTechor.options).toEqual({ a: 1, b: 0, cwd: process.cwd() })
})