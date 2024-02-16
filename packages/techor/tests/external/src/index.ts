import extend from '@techor/extend'
import log from '@techor/log'

console.log(extend, log)

// @ts-ignore
import 'fake-external-package'

export * from './foo'