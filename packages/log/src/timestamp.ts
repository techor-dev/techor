import chalk from 'chalk'
import type { Log } from './log'
import { paint } from './paint'
import processLog from './process-log'

const timestamp = (strings: TemplateStringsArray, ...slots: any[]) => {
    const message = paint('$t ') + processLog(strings, slots)
    console.log(message)
    return message
}

export { timestamp }