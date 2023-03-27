import Techor, { Options as TechorOptions } from '../../src'

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
    const techor = new Techor({ config: 'vite.config.*' })
    expect(techor.readConfig()).toBeUndefined()
})

it('can extend Techor', () => {
    interface MyConfig {
        config1?: number
        config2?: number
    }

    interface MyOptions extends TechorOptions<MyConfig> {
        a?: number
        b?: number
    }

    const defaultOptions: MyOptions = {
        b: 0
    }

    class MyTechor extends Techor<MyOptions, any> {
        constructor(
            options: MyOptions
        ) {
            super(defaultOptions, options)
        }
        method() {
            console.log(this.options.a)
        }
    }
    const myTechor = new MyTechor({ a: 1 })
    expect(myTechor.options).toEqual({ a: 1, b: 0, cwd: process.cwd() })
})