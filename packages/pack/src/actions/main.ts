import { type BuildOptions, context, Metafile, build } from 'esbuild'
import log from '@techor/log'
import path from 'upath'
import upath from 'upath'
import line, { l } from '@techor/one-liner'
import type { PackageJson } from 'pkg-types'
import prettyBytes from 'pretty-bytes'
import fs from 'fs'
import isEqual from 'lodash.isequal'
import { esbuildOptionNames } from '../utils/esbuild-option-names'
import { createFillModuleExtPlugin } from '../plugins/esbuild-plugin-fill-module-ext'
import extend from '@techor/extend'
import exploreConfig from 'explore-config'
import { execaCommand } from 'execa'
import prettyHartime from 'pretty-hrtime'
import { readJSONFileSync } from '@techor/fs'
import { createShakableLibPlugin } from '../plugins/shakable-lib'
import { changeExt } from 'upath'
import { explorePathsSync } from '@techor/glob'

declare type BuildTask = { options?: BuildOptions, metafile?: Metafile, run: () => Promise<any> }

module.exports = async function action(specifiedEntries: string[], options: any = {}) {
    // if (!specifiedEntries.length) {
    //     specifiedEntries = [path.join(options.srcdir, '**/*.{js,ts,jsx,tsx,mjs,mts,css}')]
    // }
    const pkg: PackageJson = readJSONFileSync(path.resolve('./package.json'))
    const { dependencies, peerDependencies } = pkg
    /** Extract external dependencies to prevent bundling */
    const externalDependencies = []
    dependencies && externalDependencies.push(...Object.keys(dependencies))
    peerDependencies && externalDependencies.push(...Object.keys(peerDependencies))
    if (options.declare === undefined) {
        options.declare = !!pkg.types
    }
    if (options.srcdir) upath.normalize(options.srcdir)
    if (options.clean && fs.existsSync(options.outdir)) {
        fs.rmSync(options.outdir, { force: true, recursive: true })
        log.i`**${options.outdir}** output cleaned up`
    }
    const extByFormat = { cjs: options.cjsExt, esm: options.esmExt, iife: options.iifeExt }
    const useConfig = exploreConfig('techor.*')
    const buildTasks: BuildTask[] = []

    const exploreMapptedEntry = (filePath: string, targetExt: string) => {
        const subFilePath = path.relative(options.outdir, filePath.replace('.bundle', ''))
        const srcFilePath = path.join(options.srcdir, subFilePath)
        const pattern = changeExt(srcFilePath, targetExt)
        const foundEntries = explorePathsSync(pattern)
        if (!foundEntries.length) {
            throw new Error(`Cannot find the entry file **${pattern}**`)
        }
        return foundEntries[0]
    }
    const outputFilePaths = []
    const addBuildTask = async (eachEntries: string[], eachOptions: {
        format?: string,
        bundle?: boolean,
        ext?: string,
        platform?: string,
        outdir?: string,
        outfile?: string
    } = {}) => {
        let eachOutExt = eachOptions.ext || eachOptions.outfile && path.extname(eachOptions.outfile) || undefined
        const outExtension = { '.css': '.css' }
        const external = [
            ...externalDependencies,
            ...options.external
        ]
        if (!eachOutExt) {
            eachOutExt = extByFormat[eachOptions.format]
        }
        if (eachOutExt) {
            outExtension['.js'] = eachOutExt
        }
        if (eachOptions.outdir) eachOptions.outdir = upath.normalize(eachOptions.outdir)
        if (eachOptions.bundle === undefined) eachOptions.bundle = options.bundle
        if (eachOptions.outfile) {
            if (eachOptions.bundle) {
                eachOptions.outfile = eachOptions.outfile.replace('.bundle', '')
            }
            eachOptions.outfile = upath.normalize(eachOptions.outfile)
            if (outputFilePaths.includes(eachOptions.outfile)) {
                return
            }
            outputFilePaths.push(eachOptions.outfile)
        }
        if (!eachOptions.outfile && !eachOptions.bundle) {
            eachEntries = eachEntries.filter((eachEntry) => {
                const eachOutputFilePath = changeExt(path.join(options.outdir, path.relative(options.srcdir, eachEntry)), eachOutExt)
                if (outputFilePaths.includes(eachOutputFilePath)) {
                    return false
                } else {
                    outputFilePaths.push(eachOutputFilePath)
                    return true
                }
            })
        }
        const eachOutdir = eachOptions.outdir || options.outdir

        /** 
         * Keep original directory output and prevent bundling
         * @example $ esbuild entry.js a.js b.js external.j --format=esm --outdir=dist --bundle --external:./a --external:./b
         * @example https://esbuild.github.io/try/#YgAwLjE4LjExAGVudHJ5LmpzIGEuanMgYi5qcyBleHRlcm5hbC5qIC0tZm9ybWF0PWVzbSAtLW91dGRpcj1kaXN0IC0tYnVuZGxlIC0tZXh0ZXJuYWw6Li9hIC0tZXh0ZXJuYWw6Li9iAABlbnRyeS5qcwBleHBvcnQgKiBmcm9tICcuL2EnCmV4cG9ydCAqIGZyb20gJy4vYicKZXhwb3J0ICogZnJvbSAnLi9leHRlcm5hbCcAAGEuanMAZXhwb3J0IGNvbnN0IGEgPSAnYScAAGIuanMAZXhwb3J0IGNvbnN0IGIgPSAnYicAAGV4dGVybmFsLmpzAGV4cG9ydCBjb25zdCBleHRlcm5hbCA9ICdleHRlcm5hbCc
         * */
        // if (!eachOptions.bundle) {
        //     external.push(
        //         ...(eachEntries.map((eachEntry) => './' + eachEntry))
        //     )
        // }

        const buildOptions: BuildOptions = extend(options, {
            outExtension,
            logLevel: 'info',
            outdir: eachOptions.outfile ? undefined : eachOutdir,
            outfile: eachOptions.outfile,
            outbase: options.srcdir,
            platform: eachOptions.platform || options.platform,
            metafile: true,
            bundle: eachOptions.bundle,
            entryNames: options.entryNames ? options.entryNames : (eachOptions.bundle ? '[dir]/[name].bundle' : '[dir]/[name]'),
            format: eachOptions.format,
            keepNames: options.keepNames,
            resolveExtensions: options.resolveExtensions,
            mangleProps: options.mangleProps ? new RegExp(options.mangleProps) : undefined,
            target: options.target,
            sourcemap: options.sourcemap,
            external,
            plugins: [],
        } as BuildOptions, useConfig?.pack)

        if (!buildOptions.target) {
            delete buildOptions.target
        }

        // if (!eachOptions.bundle && eachOptions.format === 'esm') {
        //     buildOptions.plugins.push(createFillModuleExtPlugin(options.esmExt))
        // }

        // buildOptions.plugins.push(createShakableLibPlugin({ srcdir: options.srcdir }))

        // Fix ERROR: Invalid option in build() call
        delete buildOptions['watch']
        delete buildOptions['serve']
        delete buildOptions['framework']

        // 安全地同步選項給 esbuild
        for (const eachBuildOptionName in buildOptions) {
            if (!esbuildOptionNames.includes(eachBuildOptionName)) {
                delete buildOptions[eachBuildOptionName]
            }
        }

        /**
         * Repeated tasks will not be added anymore
         */
        buildOptions.entryPoints = eachEntries.filter((eachEntryPoint) =>
            !buildTasks.find((eachBuildTask) =>
                (eachBuildTask.options.entryPoints as string[]).includes(eachEntryPoint)
                && eachBuildTask.options.format === buildOptions.format
                && isEqual(eachBuildTask.options.outExtension, buildOptions.outExtension)
                && eachBuildTask.options.outdir === buildOptions.outdir
                && eachBuildTask.options.outfile === buildOptions.outfile)
        )

        if (!buildOptions.entryPoints.length) {
            return
        }

        const eachBuildTask: BuildTask = {
            options: buildOptions,
            run: async () => {
                const ctx = await context(buildOptions)
                const { metafile } = await ctx.rebuild()
                if (metafile) {
                    eachBuildTask.metafile = metafile
                    for (const outputFilePath in metafile.outputs) {
                        const eachOutput = metafile.outputs[outputFilePath]
                        eachOutput['format'] = buildOptions.format
                    }
                }
                if (options.watch) {
                    await ctx.watch()
                } else {
                    await ctx.dispose()
                }
                if (options.serve) {
                    await ctx.serve()
                }
            }
        }
        buildTasks.push(eachBuildTask)
    }
    if (specifiedEntries.length) {
        const foundEntries = explorePathsSync(specifiedEntries)
        const foundCSSEntries = []
        const foundJSEntries = []
        for (const foundEntry of foundEntries) {
            if (foundEntry.endsWith('.css')) {
                foundCSSEntries.push(foundEntry)
            } else {
                foundJSEntries.push(foundEntry)
            }
        }
        if (foundCSSEntries.length) {
            addBuildTask(foundCSSEntries)
        }
        if (foundJSEntries.length) {
            options.format.forEach((eachFormat: string) => addBuildTask(foundJSEntries, {
                format: eachFormat
            }))
        }
    } else {
        /* Read entries from `package.json` automatically */
        if (pkg.exports) {
            (function handleExports(eachExports: any, eachParentKey: string, eachOptions?: { format?: string, outfile?: string, platform?: string }) {
                if (typeof eachExports === 'string') {
                    const exportsExt = path.extname(eachExports).slice(1)
                    addBuildTask([exploreMapptedEntry(eachExports, '.{js,ts,jsx,tsx,mjs,mts}')], {
                        format: {
                            'js': 'cjs',
                            'cjs': 'cjs',
                            'mjs': 'esm'
                        }[exportsExt],
                        outfile: options.outfile || eachExports,
                        platform: options.platform,
                        bundle: eachExports.includes('.bundle') || undefined
                    })
                } else {
                    for (const eachExportKey in eachExports) {
                        const eachUnknowExports = eachExports[eachExportKey]
                        let eachFormat: string
                        let eachPlatform: string
                        switch (eachParentKey) {
                            case 'node':
                                eachPlatform = 'node'
                                break
                            case 'browser':
                                eachPlatform = 'browser'
                                break
                            case 'require':
                                eachFormat = 'cjs'
                                break
                            case 'import':
                                eachFormat = 'esm'
                                break
                        }
                        if (eachExportKey.startsWith('.')) {
                            handleExports(eachUnknowExports, eachExportKey)
                        } else {
                            switch (eachExportKey) {
                                case 'node':
                                    handleExports(eachUnknowExports, eachExportKey, { platform: 'node', format: eachFormat })
                                    break
                                case 'browser':
                                    handleExports(eachUnknowExports, eachExportKey, { platform: 'browser', format: eachFormat })
                                    break
                                case 'default':
                                    handleExports(eachUnknowExports, eachExportKey, { platform: eachPlatform, format: eachFormat })
                                    break
                                case 'require':
                                    handleExports(eachUnknowExports, eachExportKey, { platform: eachPlatform, format: 'cjs' })
                                    break
                                case 'import':
                                    handleExports(eachUnknowExports, eachExportKey, { platform: eachPlatform, format: 'esm' })
                                    break
                            }
                        }
                    }
                }
            })(pkg.exports, '')
        }
        if (pkg.style) {
            addBuildTask([exploreMapptedEntry(pkg.style, '.css')], { outfile: pkg.style, bundle: pkg.main.includes('.bundle') || undefined })
        }
        if (pkg.main && !pkg.main.endsWith('.css')) {
            addBuildTask([exploreMapptedEntry(pkg.main, '.{js,ts,jsx,tsx,mjs,mts}')], { format: 'cjs', outfile: pkg.main, bundle: pkg.main.includes('.bundle') || undefined })
        }
        if (pkg.module) {
            addBuildTask([exploreMapptedEntry(pkg.module, '.{js,ts,jsx,tsx,mjs,mts}')], { format: 'esm', outfile: pkg.module, bundle: pkg.module.includes('.bundle') || undefined })
        }
        if (pkg.browser) {
            addBuildTask([exploreMapptedEntry(pkg.browser, '.{js,ts,jsx,tsx,mjs,mts}')], { format: 'iife', platform: 'browser', outfile: pkg.browser, bundle: pkg.browser.includes('.bundle') || undefined })
        }
        if (pkg.bin) {
            if (typeof pkg.bin === 'string') {
                addBuildTask([exploreMapptedEntry(pkg.bin, '.{js,ts,jsx,tsx,mjs,mts}')], { format: 'cjs', platform: 'node', outfile: pkg.bin, bundle: pkg.bin.includes('.bundle') || undefined })
            } else {
                for (const eachCommandName in pkg.bin) {
                    const eachCommandFile = pkg.bin[eachCommandName]
                    addBuildTask([exploreMapptedEntry(eachCommandFile, '.{js,ts,jsx,tsx,mjs,mts}')], { format: 'cjs', platform: 'node', outfile: eachCommandFile, bundle: eachCommandFile.includes('.bundle') || undefined })
                }
            }
        }
    }

    if (!buildTasks.length) {
        throw new Error('No entry found')
    }

    let typeBuildTask: any
    if (options.declare) {
        typeBuildTask = {
            outfile: 'declarations',
            options: {
                platform: 'ts',
                format: 'dts'
            },
            run: () => new Promise<void>((resolve) => {
                const runTsc = () => {
                    execaCommand(line`
                        npx tsc
                        --emitDeclarationOnly
                        --preserveWatchOutput
                        --declaration
                        --outDir ${options.outdir}
                        ${options.watch && '--watch --incremental'}
                    `, {
                        stdio: 'inherit',
                        stripFinalNewline: false,
                        cwd: process.cwd()
                    })
                        .catch((reason) => {
                            process.exit()
                        })
                        .finally(resolve)
                }
                if (options.watch) {
                    setTimeout(runTsc, 100)
                } else {
                    runTsc()
                }
            })
        } as any
        if (!options.watch) {
            buildTasks.push(typeBuildTask)
        }
    }

    const buildStartTime = process.hrtime()
    await Promise.all(buildTasks.map(({ run }) => run()))
    const buildEndTime = process.hrtime(buildStartTime)

    console.log('')

    if (options.watch && typeBuildTask) {
        buildTasks.push(typeBuildTask)
    }

    for (const eachBuildTask of buildTasks) {
        if (eachBuildTask.metafile) {
            Object.keys(eachBuildTask.metafile.outputs)
                .forEach((outputFilePath) => {
                    const eachOutput = eachBuildTask.metafile.outputs[outputFilePath]
                    const outputSize = prettyBytes(eachOutput.bytes).replace(/ /g, '')
                    const eachOutputFormat = eachOutput['format']
                    log.ok(l`[${eachBuildTask.options.platform}] **${outputFilePath}** ${outputSize} (${eachOutputFormat}) ${eachBuildTask.options.bundle && '(bundle)'} ${eachBuildTask.options.minify && '(minify)'} ${Object.keys(eachOutput.inputs).length} inputs`)
                })
        } else {
            log.ok(l`[${eachBuildTask.options.platform}] **${eachBuildTask['outfile']}** (${eachBuildTask.options.format})`)
        }
    }
    console.log('')
    if (options.watch) {
        log`Start watching ${buildTasks.length} build tasks $t`
    } else {
        log.success`${buildTasks.length} build tasks $t in ${prettyHartime(buildEndTime).replace(' ', '')}`
    }
    console.log('')

    if (options.watch && typeBuildTask) {
        await typeBuildTask.run()
    }
}