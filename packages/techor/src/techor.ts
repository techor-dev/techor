import Techor from './core'
import type { Options as TechorOptions } from './core'
import { BuildOptions } from 'esbuild';

export interface Config {
    pack: BuildOptions
}

type Options = TechorOptions<Config>

const techor = new Techor<Options, Config>({
    config: 'techor.{js,ts,cjs,mjs}',
})

export default techor