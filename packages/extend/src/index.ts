function isSpecificValue(val: any): boolean {
    const _Buffer = typeof Buffer !== 'undefined' ? Buffer : null
    return (
        (_Buffer && val instanceof _Buffer) ||
        val instanceof Date ||
        val instanceof RegExp
    )
}

function cloneSpecificValue(val: any): any {
    const _Buffer = typeof Buffer !== 'undefined' ? Buffer : null
    if (_Buffer && val instanceof Buffer) {
        const x = Buffer.alloc(val.length)
        val.copy(x)
        return x
    } else if (val instanceof Date) {
        return new Date(val.getTime())
    } else if (val instanceof RegExp) {
        return new RegExp(val)
    } else {
        throw new Error('Unexpected situation')
    }
}

function deepCloneArray(arr: any[]): any[] {
    const clone = []
    arr.forEach(function (item, index) {
        if (typeof item === 'object' && item !== null) {
            if (Array.isArray(item)) {
                clone[index] = deepCloneArray(item)
            } else if (isSpecificValue(item)) {
                clone[index] = cloneSpecificValue(item)
            } else {
                clone[index] = extend({}, item)
            }
        } else {
            clone[index] = item
        }
    })
    return clone
}

function safeGetProperty(object: any, property: string | symbol): any {
    if (property === '__proto__') return undefined
    return Object.prototype.hasOwnProperty.call(object, property)
        ? object[property]
        : undefined
}

export default function extend(...sources: any[]): any {
    const target: any = {}

    sources.forEach(function (obj) {
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            return
        }

        Reflect.ownKeys(obj).forEach(function (key) {
            const src = safeGetProperty(target, key)
            const val = safeGetProperty(obj, key)

            if (val === target) {
                return
            } else if (typeof val !== 'object' || val === null) {
                target[key] = val
            } else if (Array.isArray(val)) {
                target[key] = deepCloneArray(val)
            } else if (isSpecificValue(val)) {
                target[key] = cloneSpecificValue(val)
            } else if (
                typeof src !== 'object' ||
                src === null ||
                Array.isArray(src)
            ) {
                target[key] = extend({}, val)
            } else {
                target[key] = extend(src, val)
            }
        })
    })

    return target
}
