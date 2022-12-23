import chalk from 'chalk'
import type { Log } from './log'
import processLog from './process-log'

const warn: Log = (strings, ...slots) => {
    const message = chalk.yellow('⏺ Warn ') + processLog(strings, slots)
    console.log(message)
    return message
}

export { warn }

