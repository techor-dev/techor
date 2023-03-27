import chalk from 'chalk'
import type { Log } from './log'
import { paint } from './paint'
import processLog from './process-log'

const info = (strings: TemplateStringsArray, ...slots: any[]) => {
    const message = chalk.cyan('𝓲') + ' ' + processLog(strings, slots)
    console.log(message)
    return message
}

export { info }