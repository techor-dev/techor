import fs from 'fs'
import upath from 'upath'
import fg from 'fast-glob'
import extend from '@techor/extend'

interface Options extends fg.Options {
    encoding?: BufferEncoding
    flag?: string
}

export function readFile(
    source: fg.Pattern | fg.Pattern[],
    options?: Options
): Buffer | string {
    if (!source?.length) return
    options = extend({ cwd: process.cwd() }, options)
    const filePath = fg.sync(source, options)[0]
    if (!filePath) return
    const resolvedFilePath = upath.resolve(options.cwd, filePath)
    return fs.readFileSync(resolvedFilePath, options)
}

export function readFileAsStr(
    source: fg.Pattern | fg.Pattern[],
    options?: Options
): string {
    const file = readFile(source, options)
    return file ? file.toString().replace(/(\r\n|\r|\n)/g, '\n') : undefined
}

export function readFileAsJSON(
    source: fg.Pattern | fg.Pattern[],
    options?: Options
): any {
    const str = readFileAsStr(source, options)
    return str ? JSON.parse(str) : undefined
}

export function readFiles(
    source: fg.Pattern | fg.Pattern[],
    options?: Options
): (Buffer | string)[] {
    if (!source?.length) return []
    options = extend({ cwd: process.cwd() }, options)
    const filePaths = fg.sync(source, options)
    if (!filePaths.length) return []
    return filePaths
        .map((eachFilePath) => fs.readFileSync(upath.resolve(options.cwd, eachFilePath), options))
        .filter((eachFile) => eachFile)
}