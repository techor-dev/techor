import chalk from 'chalk'
import { paint } from './paint'

export default function processLog(strings: TemplateStringsArray, slots: any[]) {
    if (Array.isArray(strings)) {
        let message = ''
        for (let i = 0; i < strings.length; i++) {
            message += paintSlot(strings[i]) + paintSlot(slots[i])
        }
        return paint(message)
    } else {
        // @ts-ignore
        return [strings, ...slots]
            .map((eachStr) => paintSlot(eachStr))
            .join(' ')
    }
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
        switch (typeof slot) {
            case 'number':
            case 'boolean':
                return chalk.blue(slot)
            default:
                return slot
        }
    }
}
