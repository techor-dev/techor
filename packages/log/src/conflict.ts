import chalk from 'chalk'
import type { Log } from './log'
import processLog from './process-log'

const conflict: Log = (strings, ...slots) => {
    const message = chalk.bgYellow.bold.white(' ⚠️ CONFLICT ') + ' ' + chalk.yellow(processLog(strings, slots))
    console.log(message)
    return message
}

export { conflict }