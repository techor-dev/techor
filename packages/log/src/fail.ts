import chalk from 'chalk'
import type { Log } from './log'
import { paint } from './paint'
import processLog from './process-log'

const fail = (strings: TemplateStringsArray, ...slots: any[]) => {
    const message = chalk.red('⏺ Fail ') + processLog(strings, slots)
    console.log(message)
    return message
}

export { fail }