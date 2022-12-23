import treeify from 'object-treeify'
import { paint } from './paint'

const tree = (object: JSON | object) => {
    console.log(
        treeify(parseObject(JSON.parse(JSON.stringify(object))), {
            spacerNeighbour: paint('..│..') + '  ',
            keyNoNeighbour: paint('..└─..') + ' ',
            keyNeighbour: paint('..├─..') + ' ',
            separator: paint('..:..') + ' '
        })
    )
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