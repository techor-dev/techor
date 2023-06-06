import extend from '@techor/extend'
import log from '@techor/log'

console.log(extend, log);

(async () => {
    // @ts-ignore
    await import('fake-external-package')
})()