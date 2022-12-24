import chalk from 'chalk'
import { paint } from './paint'

export default function processLog(strings: TemplateStringsArray, slots: any[]) {
    let message = ''
    if (Array.isArray(strings)) {
        for (let i = 0; i < strings.length; i++) {
            message += paintSlot(strings[i]) + paintSlot(slots[i])
        }
    } else {
        message = [strings, ...slots]
            .map((eachStr) => paintSlot(eachStr))
            .join(' ')
    }
    return paint(message)
}

const paintSlot = (slot: any) => {
    if (!slot) return ''
    if (Array.isArray(slot)) {
        return slot
            .map((eachArrItem: any) => {
                switch (typeof eachArrItem) {
                    case 'string':
                        return `'${chalk.yellow(eachArrItem)}'`
                    case 'number':
                    case 'boolean':
                        return chalk.blue(eachArrItem)
                    default:
                        return eachArrItem
                }
            })
            .join(chalk.gray(', '))
    } else {
        return slot
    }
}
