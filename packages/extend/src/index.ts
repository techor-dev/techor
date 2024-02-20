function isSpecificValue(val) {
    const _Buffer = typeof Buffer !== 'undefined' ? Buffer : null
    return (
        _Buffer && val instanceof _Buffer
        || val instanceof Date
        || val instanceof RegExp
    ) ? true : false
}

function cloneSpecificValue(val) {
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

/**
 * Recursive cloning array.
 */
function deepCloneArray(arr) {
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

function safeGetProperty(object, property) {
    return property === '__proto__' ? undefined : object[property]
}

/**
 * Extening object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   extend({}, yourObj_1, [yourObj_N]);
 */
export default function extend(...sources: any[]) {
    const target = {}

    let val: any, src: any

    sources.forEach(function (obj) {
        // skip argument if isn't an object, is null, or is an array
        if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
            return
        }

        Object.keys(obj).forEach(function (key) {
            src = safeGetProperty(target, key) // source value
            val = safeGetProperty(obj, key) // new value

            // recursion prevention
            if (val === target) {
                return

                /**
                 * if new value isn't object then just overwrite by new value
                 * instead of extending.
                 */
            } else if (typeof val !== 'object' || val === null) {
                target[key] = val
                return

                // just clone arrays (and recursive clone objects inside)
            } else if (Array.isArray(val)) {
                target[key] = deepCloneArray(val)
                return

                // custom cloning and overwrite for specific objects
            } else if (isSpecificValue(val)) {
                target[key] = cloneSpecificValue(val)
                return

                // overwrite by new value if source isn't object or array
            } else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                target[key] = extend({}, val)
                return

                // source value and new value is objects both, extending...
            } else {
                target[key] = extend(src, val)
                return
            }
        })
    })

    return target
}