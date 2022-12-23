import chalk from 'chalk'
import type { Log } from './log'
import processLog from './process-log'

const pass: Log = (strings, ...slots) => {
    const message = chalk.bgGreen.bold.white(' ✓ PASS ') + ' ' + processLog(strings, slots)
    console.log(message)
    return message
}

export { pass }