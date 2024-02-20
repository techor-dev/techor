import extend from '@techor/extend' // deps
import log from '@techor/log' // peerDeps
import { del } from '@techor/log/dist' // wide module path

// @ts-ignore
import 'fake-external-package' // --external fake-external-package

export * from './foo'

console.log(extend, log, del)
