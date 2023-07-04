import fs from 'fs'
import path from 'path'

export function readFileAsStr(...paths) {
    return fs.readFileSync(path.join(...paths)).toString()
}