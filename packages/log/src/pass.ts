import chalk from 'chalk'
import processLog from './process-log'

const pass = (strings: TemplateStringsArray, ...slots: any[]) => {
    const message = chalk.bgGreen.bold.white(' ✓ PASS ') + ' ' + processLog(strings, slots)
    console.log(message)
    return message
}

export { pass }