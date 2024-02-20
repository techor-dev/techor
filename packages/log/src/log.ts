import treeify from 'object-treeify'
import { add } from './add'
import { error } from './error'
import { conflict } from './conflict'
import { ok } from './ok'
import { del } from './del'
import { valid } from './valid'
import { invalid } from './invalid'
import { info } from './info'
import { success } from './success'
import { warn } from './warn'
import { pass } from './pass'
import { tree } from './tree'
import { fail } from './fail'
import { paint } from './paint'
import { timestamp } from './timestamp'
import processLog from './process-log'
import { parseError } from './utils/parse-error'
import chalk from 'chalk'

// @ts-ignore
const log: Log = ((strings, ...slots) => {
    if (strings instanceof Error) {
        const error = strings
        const { message, stackTree } = parseError(error)
        console.log('')
        console.log(chalk.bgRed.bold.white(` 𝗫 ${error.name || error['code'] || 'Error'} `) + ' ' + chalk.bold.red(message))
        if (stackTree) {
            console.log(treeify(stackTree, {
                spacerNeighbour: chalk.redBright.dim('│  '),
                keyNoNeighbour: chalk.redBright.dim('└ '),
                keyNeighbour: chalk.redBright.dim('├ '),
                separator: chalk.redBright.dim(': ')
            }))
        } else {
            console.log('')
            console.log({ ...error })
        }
        if (error.cause) {
            console.log('')
            console.log(chalk.redBright('Caused by:') + ' ' + error.cause)
        }
        console.log('')
        return message
    } else {
        const message = processLog(strings, slots)
        console.log(message)
        return message
    }
})

Object.assign(log, {
    a: add, add,
    d: del, del, delete: del,
    o: valid, valid,
    x: invalid, invalid,
    i: info, info,
    e: error, error,
    t: timestamp, timestamp,
    success,
    fail,
    warn,
    pass,
    conflict,
    ok,
    tree,
    paint,
    chalk
})

export { log }

export interface Log {
    (strings: TemplateStringsArray | Error | string, ...messages: any[]): void
    conflict: Log,
    pass: Log,
    e: Log, error: Log,
    i: Log, info: Log,
    t: Log, timestamp: Log,
    success: Log,
    warn: Log,
    fail: Log,
    x: Log, invalid: Log,
    o: Log, valid: Log
    ok: Log,
    d: Log, del: Log, delete: Log,
    a: Log, add: Log
    // load: (event: string, message: string, options: any) => any
    tree: (object: object | JSON) => void
    paint: typeof paint
    chalk: typeof chalk
}