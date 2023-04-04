import upath from 'upath'
import fg from 'fast-glob'
import extend from '@techor/extend'
import requireFromString from 'require-from-string'
import { readFileAsJSON } from '@techor/fs'
import { buildSync } from 'esbuild'

export default function crossImport(
    source: string | fg.Pattern[],
    options?: fg.Options,
    buildOptions?: any
): any {
    options = extend({ cwd: process.cwd() }, options)
    if (!source) return
    const filePath = fg.sync(source, options)[0]
    if (!filePath) return
    const pkg = readFileAsJSON('./package.json', { cwd: options.cwd })
    const { dependencies, peerDependencies, devDependencies } = pkg || {}
    // ⚠️ Definitely don't exclude "esbuild"
    const external = []
    dependencies && external.push(...Object.keys(dependencies))
    peerDependencies && external.push(...Object.keys(peerDependencies))
    devDependencies && external.push(...Object.keys(devDependencies))
    const resolvedFilePath = upath.resolve(options.cwd, filePath)
    const buildResult = buildSync(
        extend({
            entryPoints: [resolvedFilePath],
            logLevel: process.env.NODE_ENV === 'test' ? 'debug' : 'silent',
            bundle: true,
            format: 'cjs',
            write: false,
            target: 'esnext',
            platform: 'node',
            external
        }, buildOptions)
    )
    const { text } = buildResult.outputFiles[0]
    return requireFromString(text, upath.changeExt(resolvedFilePath, '.js'))
}

export { crossImport }