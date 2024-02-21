import log from '@techor/log'
import { RollupError, RollupLog } from 'rollup'
import { trimNewlines } from 'trim-newlines'

const formatFrame = (target: RollupLog | RollupError, color: string) => {
    const frameLines = target.frame.split('\n')
    return frameLines.map((line, index) => {
        if (target.loc.line - 1 === index) {
            return log.chalk.white(line)
        }
        if (target.loc.line === index) {
            // 如果错误行与当前行匹配，添加箭头指向错误列
            return line.replace('^', log.chalk[color]('^'))
        }
        return log.chalk.dim(line)
    }).join('\n')
}

export function logRollupWarning(warning: RollupLog) {
    console.log('')
    log.warn(warning.message)
    if (warning.frame) {
        console.log('')
        const formattedFrame = formatFrame(warning, 'red')
        console.log(trimNewlines(formattedFrame))
    }
    if (warning.loc) {
        console.log('')
        console.log(`at ${log.chalk.cyan(`${warning.loc.file}:${warning.loc.line}:${warning.loc.column}`)}`)
    }
}

export function logRollupError(error: RollupError) {
    log(error as Error)
    if (error.frame) {
        const formattedFrame = formatFrame(error, 'red')
        console.log(trimNewlines(formattedFrame))
    }
    if (error.loc) {
        console.log('')
        console.log(`at ${log.chalk.cyan(`${error.loc.file}:${error.loc.line}:${error.loc.column}`)}`)
    }
}