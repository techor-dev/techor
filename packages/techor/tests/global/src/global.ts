import isObject from 'is-obj'

console.log(isObject({ foo: 'bar' }))

globalThis.effect1 = 'created'

const includeEffect = false

if (includeEffect) {
    globalThis.effect1 = 'not created'
}

function effect2() {
    globalThis.effect2 = 'created'
}

effect2()