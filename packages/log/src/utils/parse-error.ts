import dedent from 'dedent'
import chalk from 'chalk'

export function parseError(error: any) {
    const { message, stack } = typeof error === 'string' ? new Error(error as any) : error
    const stackTree = {}
    dedent(stack
        .replace(message, '')
        .replace(/^Error: /, '')
    )
        .split('\n')
        .forEach((line: string) => {
            stackTree[
                line
                    .split(' ')
                    .map((eachSplit) => eachSplit
                        .replace(/^\((.+)\)$/, `${chalk.cyan('$1')}`)
                        .replace(/\./g, `${chalk.dim('.')}`)
                        .replace(/^at$/, m => chalk.dim(m))
                    )
                    .join(' ')
            ] = null
        })
    return {
        message: message
            .trim()
            .replace(/Error: /g, ''),
        stackTree
    }
}