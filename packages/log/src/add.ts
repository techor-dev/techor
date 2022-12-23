import chalk from 'chalk'
import type { Log } from './log'
import processLog from './process-log'

const add: Log = (strings, ...slots) => {
    const message = chalk.green('+') + ' ' + processLog(strings, slots)
    console.log(message)
    return message
}

export { add }