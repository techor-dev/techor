import exploreConfig from 'explore-config'
import { Config } from './config'
import log from '@techor/log'

export default function loadConfig() {
    const basename = 'techor.config'
    const useConfig = exploreConfig(basename, {
        found: (basename) => log.i`Loaded **${basename}**`
    }) as Config
    if (useConfig) {
        return useConfig
    }
}