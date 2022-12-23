import chalk from 'chalk'
import type { Log } from './log'
import processLog from './process-log'

const invalid: Log = (strings, ...slots) => {
    const message = chalk.red('✗ ') + processLog(strings, slots)
    console.log(message)
    return message
}

export { invalid }