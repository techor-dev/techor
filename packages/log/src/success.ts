import chalk from 'chalk'
import type { Log } from './log'
import processLog from './process-log'

const success: Log = (strings, ...slots) => {
    const message = chalk.green('⏺ Success ') + processLog(strings, slots)
    console.log(message)
    return message
}

export { success }