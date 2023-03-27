import chalk from 'chalk'
import processLog from './process-log'

const del = (strings: TemplateStringsArray, ...slots: any[]) => {
    const message = chalk.red('-') + ' ' + processLog(strings, slots)
    console.log(message)
    return message
}

export { del }