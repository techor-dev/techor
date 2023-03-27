import chalk from 'chalk'
import processLog from './process-log'

const conflict = (strings: TemplateStringsArray, ...slots: any[]) => {
    const message = chalk.bgYellow.bold.white(' ⚠️ CONFLICT ') + ' ' + chalk.yellow(processLog(strings, slots))
    console.log(message)
    return message
}

export { conflict }