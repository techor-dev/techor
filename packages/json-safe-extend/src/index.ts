export default function extend<T extends object>(...sources: Partial<T>[]): T {
    const target: any = {}

    for (const obj of sources) {
        if (typeof obj !== 'object' || obj === null) continue

        for (const key of Reflect.ownKeys(obj)) {
            const val = obj[key]
            const src = target[key]

            if (val === target) continue

            if (Array.isArray(val)) {
                target[key] = val.map(item =>
                    typeof item === 'object' && item !== null
                        ? extend({}, item)
                        : item
                )
            } else if (
                typeof val === 'object' &&
                val !== null &&
                !Array.isArray(val)
            ) {
                target[key] =
                    typeof src === 'object' && src !== null && !Array.isArray(src)
                        ? extend(src, val)
                        : extend({}, val)
            } else {
                target[key] = val
            }
        }
    }

    return target
}
