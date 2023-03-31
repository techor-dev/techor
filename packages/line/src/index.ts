function line(defaultClassNames: TemplateStringsArray, ...params: any[])
function line(defaultClassNames: any, ...params: any[])
function line(firstParam: any, ...params: any[]) {
    let newClassName = ''

    function handle(value: any, delimiter = '') {
        if (value) {
            if (typeof value === 'string' || typeof value === 'number') {
                newClassName += delimiter + value
            } else if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    for (const eachVal of value) {
                        handle(eachVal, ' ')
                    }
                } else {
                    for (const key in value) {
                        if (value[key]) {
                            newClassName += ' ' + key
                        }
                    }
                }
            }
        }
    }

    if (Array.isArray(firstParam) && 'raw' in firstParam) {
        const defaultClassNames = firstParam as TemplateStringsArray
        for (let i = 0; i < defaultClassNames.length; i++) {
            newClassName += defaultClassNames[i]
            if (i < params.length) {
                handle(params[i])
            }
        }
    } else {
        handle(firstParam)

        for (const eachParam of params) {
            handle(eachParam, newClassName.length ? ' ' : '')
        }
    }

    return newClassName
        .trim()
        .replace(/\n/g, ' ')
        .replace(/  +/g, ' ')
}

export { line as l, line }
export default line
