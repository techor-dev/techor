import type { Log } from './log'
import { paint } from './paint'
import processLog from './process-log'

const info: Log = (strings, ...slots) => {
    const message = paint('$t ') + processLog(strings, slots)
    console.log(message)
    return message
}

export { info }