import '@master/css'
import merge from 'lodash.merge'

console.log(merge);

(async () => {
    // @ts-ignore
    await import('fake-external-package')
})()