import treeify from 'object-treeify'
import { paint } from './paint'

const tree = (object: JSON | object) => {
    const message = treeify(parseObject(JSON.parse(JSON.stringify(removeEmpty(object)))), {
        spacerNeighbour: paint('..│..') + '  ',
        keyNoNeighbour: paint('..└─..') + ' ',
        keyNeighbour: paint('..├─..') + ' ',
        separator: paint('..:..') + ' '
    })
    console.log(message)
    return message
}

function removeEmpty(data) {
    //transform properties into key-values pairs and filter all the empty-values
    const entries = Object.entries(data).filter(([, value]) => value != null)
    //map through all the remaining properties and check if the value is an object.
    //if value is object, use recursion to remove empty properties
    const clean = entries
        .map(([key, v]) => {
            const value = typeof v == 'object' ? removeEmpty(v) : v
            return [key, value]
        })
        .filter(([key, v]) => {
            return typeof v === 'object' ? Object.keys(v).length : true
        })
    //transform the key-value pairs back to an object.
    return Object.fromEntries(clean)
}

function parseObject(object) {
    for (const key in object) {
        const value = object[key]
        if (Array.isArray(value)) {
            object[key] = value
                .map((eachValue) => paint(`**${eachValue}**`))
                .join(paint('..,..'))
        } else if (typeof value === 'object') {
            parseObject(value)
        } else {
            object[key] = paint(`**${value}**`)
        }
    }
    return object
}

export { tree }