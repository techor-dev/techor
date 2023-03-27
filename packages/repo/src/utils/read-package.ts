import fs from 'fs-extra'

export function readPackage(pkgPath = './package.json') {
    return fs.readJSONSync(pkgPath, { throws: false }) || {}
}