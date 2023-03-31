export default function aPlainObj(target: any) {
    return target === null
        ? false
        : (target?.constructor?.name === 'Object' || typeof target === 'object' && !target?.__proto__) // for Object.create({})
}

export { aPlainObj }