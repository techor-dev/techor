import { Config, rawLoader } from '../../src'

export default {
    build: {
        input: {
            plugins: [
                rawLoader('**/*.txt')
            ]
        }
    }
} as Config