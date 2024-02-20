import log from '@techor/log'
import { RollupError } from 'rollup'
import { trimNewlines } from 'trim-newlines'

export default function logRollupError(error: RollupError) {
    const formattedError = []
    console.log('')
    if (error.frame) {
        const frameLines = error.frame.split('\n')
        const formattedFrame = frameLines.map((line, index) => {
            if (error.loc.line - 1 === index) {
                return log.chalk.white(line)
            }
            if (error.loc.line === index) {
                // 如果错误行与当前行匹配，添加箭头指向错误列
                return line.replace('^', log.chalk.red('^'))
            }
            return log.chalk.dim(line)
        }).join('\n')
        formattedError.push(formattedFrame)
    }
    console.log(trimNewlines(formattedError.join('\n')))
    console.log('')
    if (error.loc) {
        console.log(`at ${log.chalk.cyan(`${error.loc.file}:${error.loc.line}:${error.loc.column}`)}`)
    }
    log(error as Error)
}