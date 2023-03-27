import chalk from 'chalk'
import processLog from './process-log'

const warn = (strings: TemplateStringsArray, ...slots: any[]) => {
    const message = chalk.yellow('⏺ Warn ') + processLog(strings, slots)
    console.log(message)
    return message
}

export { warn }

