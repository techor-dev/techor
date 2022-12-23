import chalk from 'chalk'
import type { Log } from './log'
import processLog from './process-log'

const error: Log = (strings, ...slots) => {
    const message = chalk.bgRed.bold.white(' 𝗫 ERROR ') + ' ' + processLog(strings, slots)
    console.log(message)
    return message
}

export { error }