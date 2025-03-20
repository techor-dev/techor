import startDebug from './start-debug'

if (process.env.NODE_ENV === 'development') {
    startDebug()
}

console.log('hello world')