import upath from 'upath'
import log from '@techor/log'
import defaultOptions, { Options as TechorOptions } from './options'
import fg from 'fast-glob'
import crossImport from 'cross-import'
import extend from '@techor/extend'
import type { BuildOptions } from 'esbuild'

export default class Techor<Options extends TechorOptions<Config>, Config> {
    options: Options

    constructor(
        ...options: Options[]
    ) {
        this.options = extend(defaultOptions, ...options) as Options
    }

    logConfigFound = (configPath: string) => log.ok`**${configPath}** config file found`
    logConfigNotFound = (configPath: string) => log.i`No **${configPath}** config file found`

    readConfig(key = 'config', buildOptions?: BuildOptions): Config | any {
        const { config, cwd } = this.options
        if (typeof config === 'object') {
            return config as Config
        }
        let userConfig: Config
        try {
            const configPath = this.configPath
            if (configPath) {
                const userConfigModule = crossImport(configPath, { cwd }, buildOptions as any)
                userConfig = (key ? userConfigModule[key] : undefined) || userConfigModule.default || userConfigModule
                this.logConfigFound(configPath)
            } else {
                this.logConfigNotFound(config as string)
            }
        } catch (err) {
            log.error(err)
        }
        return userConfig
    }

    get configPath(): string {
        const { cwd, config } = this.options
        if (!config || typeof config !== 'string') {
            return
        }
        return fg.sync(config, { cwd })[0]
    }

    get resolvedConfigPath() {
        const configPath = this.configPath
        return configPath ? upath.resolve(this.options.cwd, configPath) : ''
    }
}