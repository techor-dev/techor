import chalk from 'chalk'
import processLog from './process-log'

const success = (strings: TemplateStringsArray, ...slots: any[]) => {
    const message = chalk.green('⏺ Success ') + processLog(strings, slots)
    console.log(message)
    return message
}

export { success }