import treeify from 'object-treeify'
import { paint } from './paint'

const tree = (object: JSON | object) => {
    const message = treeify(parseObject(removeEmpty(JSON.parse(JSON.stringify(object)))), {
        spacerNeighbour: paint('..│..') + '  ',
        keyNoNeighbour: paint('..└..') + ' ',
        keyNeighbour: paint('..├..') + ' ',
        separator: paint('..:..') + ' '
    })
    console.log(message)
    return message
}

function removeEmpty(data) {
    for (const dataKey in data) {
        const dataValue = data[dataKey]
        if (typeof dataValue === 'object') {
            if (dataValue !== null && !Object.keys(dataValue).length) {
                delete data[dataKey]
            } else {
                data[dataKey] = removeEmpty(dataValue)
            }
        } else if (dataValue === undefined) {
            delete data[dataKey]
        }
    }
    return data
}

function parseObject(object) {
    for (const key in object) {
        const value = object[key]
        if (Array.isArray(value)) {
            object[key] = value
                .map((eachValue) => paint(`**${eachValue}**`))
                .join(paint('..,.. '))
        } else if (typeof value === 'object') {
            parseObject(value)
        } else {
            object[key] = paint(`**${value}**`)
        }
    }
    return object
}

export { tree }