import chalk from 'chalk'
import processLog from './process-log'

const ok = (strings: TemplateStringsArray, ...slots: any[]) => {
    const message = chalk.green('✓ ') + processLog(strings, slots)
    console.log(message)
    return message
}

export { ok }