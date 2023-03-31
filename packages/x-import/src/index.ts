import upath from 'upath'
import requireFromString from 'require-from-string'
import fg from 'fast-glob'
import extend from '@techor/extend'
import { BuildOptions, buildSync } from 'esbuild'
import { readFileAsJSON } from '@techor/fs'

export default function xImport(
    source: string | fg.Pattern[],
    options?: fg.Options,
    buildOptions?: BuildOptions
): any {
    options = extend({ cwd: process.cwd() }, options)
    if (!source) return
    const filePath = fg.sync(source, options)[0]
    if (!filePath) return

    const pkg = readFileAsJSON('./package.json', { cwd: options.cwd })
    const { dependencies, peerDependencies, devDependencies } = pkg || {}
    /** Extract external dependencies to prevent bundling */
    const external = []
    dependencies && external.push(...Object.keys(dependencies))
    peerDependencies && external.push(...Object.keys(peerDependencies))
    devDependencies && external.push(...Object.keys(devDependencies))
    if (!external.includes('esbuild')) {
        external.push('esbuild')
    }
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
    const { text, } = buildResult.outputFiles[0]
    return requireFromString(text, upath.changeExt(resolvedFilePath, '.js'))
}

export { xImport }