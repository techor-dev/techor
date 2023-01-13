import upath from 'upath'
import log from '@techor/log'
import defaultOptions, { Options, Options as TechorOptions } from './options'
import fg from 'fast-glob'
import crossImport from 'cross-import'
import extend from 'to-extend'

export default class Techor<Options extends TechorOptions<Config>, Config> {
    options: Options
    constructor(
        ...options: Options[]
    ) {
        this.options = extend(defaultOptions, ...options) as Options
    }

    readConfig(): Config {
        const { config, cwd } = this.options
        if (typeof config === 'object') {
            return config as Config
        }
        let userConfig: Config
        try {
            const configPath = this.configPath
            if (configPath) {
                const userConfigModule = crossImport(configPath, { cwd })
                userConfig = userConfigModule.config || userConfigModule.default || userConfigModule
                log.ok`Import **${configPath}** config`
            } else if (config) {
                log.x`Cannot find -${config}- config`
            } else {
                log.ok`No config file`
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

export { default as options } from './options'

export type { Options }