import chalk from 'chalk'
import processLog from './process-log'

const error= (strings: TemplateStringsArray, ...slots: any[]) => {
    const message = chalk.bgRed.bold.white(' 𝗫 Error ') + ' ' + processLog(strings, slots)
    console.log(message)
    return message
}

export { error }