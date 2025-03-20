import { readJSONFileSync } from '@techor/fs'
import log from '@techor/log'
import { existsSync, rmSync } from 'fs'
import type { PackageJson } from 'pkg-types'
import { OutputChunk as RollupOutputChunk, OutputOptions as RollupOutputOptions, OutputPlugin as RollupOutputPlugin, InputOptions as RollupInputOptions, RollupOutput, RollupError, rollup, OutputAsset as RollupOutputAsset, watch as rollupWatch, RollupBuild, InputPluginOption as RollupInputPluginOption } from 'rollup'
import extend from '@techor/extend'
import { explorePathsSync } from '@techor/glob'
import { basename, extname, normalize, relative } from 'path'
import upath from 'upath'
import prettyBytes from 'pretty-bytes'
import align from 'wide-align'
import prettyHartime from 'pretty-hrtime'
import { logRollupError, logRollupWarning } from '../utils/log-rollup'
import { execaCommand } from 'execa'
import clsx from 'clsx'
import getWideExternal from '../utils/get-wide-external'
import { BuildCommonOptions, Config, default as defaultConfig } from '../config'
import yargsParser, { Options as YargsParserOptions } from 'yargs-parser'
import loadConfig from '../load-config'
import replace from '@rollup/plugin-replace'

// core plugins
import esmShim from '../plugins/esm-shim'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import swc from '../plugins/swc'
import preserveDirectives from 'rollup-plugin-preserve-directives'

declare type OutputResult = (BuildOutputOptions & { artifact: (RollupOutputAsset | RollupOutputChunk) })
declare type BuildOutputOptions = BuildCommonOptions & { output: RollupOutputOptions }
declare interface BuildOptions {
    input: RollupInputOptions,
    outputOptionsList: BuildOutputOptions[]
}

export const yargsParserOptions: YargsParserOptions = {
    alias: {
        formats: 'f',
        watch: 'w',
        clean: 'c',
        'output.file': 'o'
    },
    configuration: {
        'strip-aliased': true,
        'strip-dashed': true
    },
    array: ['formats']
}

export default async function build() {
    const { _, ...cmdConfig } = yargsParser(process.argv.slice(2), yargsParserOptions)
    const [commandName, ...commandInputs] = _ as [string, ...string[]]
    try {
        const useConfig = loadConfig()
        const config = extend(defaultConfig, useConfig, { build: cmdConfig }) as Config
        if (commandName === 'dev') {
            process.env.NODE_ENV = 'development'
            config.build.watch = true
        } else {
            process.env.NODE_ENV = 'production'
        }

        if (process.env.DEBUG) console.log('[techor] cmdConfig', cmdConfig)
        const pkg: PackageJson = readJSONFileSync('package.json') || {}
        const { dependencies, peerDependencies, optionalDependencies, types } = pkg
        const buildMap = new Map<RollupInputOptions['input'], BuildOptions>()

        if (config.build.declare === undefined && types) config.build.declare = true

        if (Array.isArray(config.build.input.external)) {
            if (dependencies) config.build.input.external.push(...Object.keys(dependencies))
            if (peerDependencies) config.build.input.external.push(...Object.keys(peerDependencies))
            if (optionalDependencies) config.build.input.external.push(...Object.keys(optionalDependencies))
        }

        // remove output dir first
        if (config.build.clean && existsSync(config.build.output.dir)) {
            rmSync(config.build.output.dir, { force: true, recursive: true })
            log.i`Cleaned up **${config.build.output.dir}**`
        }

        function addBuild(entries: string | string[], rollupOutputOptions: RollupOutputOptions) {
            if (Array.isArray(entries)) {
                entries = entries.map((eachEntry) => normalize(eachEntry))
            } else {
                entries = normalize(entries)
            }
            let forceBundle: boolean
            const extendedBuild = extend(config.build, { output: rollupOutputOptions }) as BuildOutputOptions
            // single entry
            if (extendedBuild.output.file) {
                if (!extendedBuild.output.format) {
                    extendedBuild.output.format = config.build.formatOfExt[extname(extendedBuild.output.file)]
                }
                const fileBasenameSplits = basename(extendedBuild.output.file).split('.')
                if (fileBasenameSplits.includes('min')) {
                    forceBundle = true
                    extendedBuild.minify = true
                }
                if (fileBasenameSplits.includes('global') || fileBasenameSplits.includes('iife')) extendedBuild.output.format = 'iife'
                extendedBuild.env = fileBasenameSplits.includes('development') ? 'development' : 'production'

                for (const [eachInput, eachBuildOptions] of buildMap) {
                    for (const eachOutputOptions of eachBuildOptions.outputOptionsList) {
                        if (normalize(eachOutputOptions.output.file) === normalize(extendedBuild.output.file)) {
                            if (process.env.DEBUG) console.log('[techor] extendedBuild', extendedBuild)
                            return
                        }
                    }
                }
            } else {
                extendedBuild.output.entryFileNames = (chunkInfo) => {
                    return `${chunkInfo.name}${config.build.extOfFormat[extendedBuild.output.format]}`
                }
            }
            if (extendedBuild.output.preserveModules && !extendedBuild.output.preserveModulesRoot) {
                extendedBuild.output.preserveModulesRoot = extendedBuild.srcDir
            }
            let buildOptions = buildMap.get(entries)
            if (buildOptions) {
                // 合併同一個 input 來源並對應多個 RollupOutputOptions 避免重新 parse 相同的 input
                (buildOptions.outputOptionsList).push(extendedBuild)
            } else {
                buildOptions = {
                    outputOptionsList: [extendedBuild]
                } as BuildOptions
                buildOptions.input = extend({
                    onwarn: (warning, warn) => {
                        switch (warning.code) {
                            case 'MODULE_LEVEL_DIRECTIVE':
                                // https://github.com/Ephem/rollup-plugin-preserve-directives?tab=readme-ov-file#rollup-warning
                                if (config.build.preserveDirectives && extendedBuild.output.preserveModules) {
                                    return
                                }
                                break
                        }
                        logRollupWarning(warning)
                    }
                } as RollupInputOptions, config.build.input)
                buildOptions.input.input = entries
                buildOptions.input.external = (config.build.input.external && !forceBundle) && getWideExternal(config.build.input.external)
                const extendedSWCOptions: Config['build']['swc'] = extend(
                    config.build.swc, { tsconfigFile: config.build.tsconfig } as Config['build']['swc'])
                if (extendedBuild.minify) {
                    extendedSWCOptions.minify = true

                } else {
                    delete extendedSWCOptions.minify
                    delete extendedSWCOptions.jsc.minify
                }
                (buildOptions.input.plugins as RollupInputPluginOption[]).unshift(
                    ...[
                        replace({
                            preventAssignment: true,
                            'process.env.NODE_ENV': JSON.stringify(extendedBuild.env)
                        }),
                        swc(extendedSWCOptions),
                        config.build.commonjs && commonjs(config.build.commonjs),
                        config.build.nodeResolve && nodeResolve(config.build.nodeResolve),
                        config.build.esmShim && esmShim(),
                        (config.build.preserveDirectives && !extendedBuild.output.file) && preserveDirectives(config.build.preserveDirectives),
                    ]
                        .filter((existence) => existence)
                )
                if (process.env.DEBUG) console.log('[techor] buildOptions', buildOptions)
                buildMap.set(entries, buildOptions)
            }
        }

        if (commandInputs.length) {
            const foundEntries = explorePathsSync(commandInputs)
            config.build.formats.map((eachFormat) => {
                addBuild(foundEntries, { format: eachFormat })
            })
        } else {
            log.i`Detected entries (package.json)`

            const exploreMapptedEntry = (filePath: string) => {
                const subFilePath = upath.relative(config.build.output.dir, filePath)
                const srcFilePath = upath.join(config.build.srcDir, subFilePath)
                const pattern = upath.changeExt(srcFilePath, `.{${config.build.sourceExtensions.join(',')}}`)
                const foundEntries = explorePathsSync(pattern)
                if (!foundEntries.length) {
                    throw new Error(`Cannot find the entry file **${pattern}**`)
                }
                return foundEntries[0]
            }

            if (pkg.exports) {
                (function handleExports(eachExports: any, eachFormat?: RollupOutputOptions['format']) {
                    if (typeof eachExports === 'string') {
                        addBuild(exploreMapptedEntry(eachExports), {
                            format: eachFormat,
                            file: eachExports
                        })
                    } else {
                        for (const eachExportKey in eachExports) {
                            const eachUnknowExports = eachExports[eachExportKey]
                            if (eachExportKey.startsWith('.')) {
                                handleExports(eachUnknowExports, eachFormat)
                            } else {
                                switch (eachExportKey) {
                                    case 'node':
                                        handleExports(eachUnknowExports, eachFormat)
                                        break
                                    case 'browser':
                                        handleExports(eachUnknowExports, eachFormat)
                                        break
                                    case 'default':
                                        handleExports(eachUnknowExports, eachFormat)
                                        break
                                    case 'require':
                                        handleExports(eachUnknowExports, 'cjs')
                                        break
                                    case 'import':
                                        handleExports(eachUnknowExports, 'esm')
                                        break
                                    default:
                                        handleExports(eachUnknowExports, eachFormat)
                                }
                            }
                        }
                    }
                })(pkg.exports)
            }

            if (pkg.main) {
                addBuild(exploreMapptedEntry(pkg.main), { file: pkg.main })
            }

            if (pkg.module) {
                addBuild(exploreMapptedEntry(pkg.module), { format: 'esm', file: pkg.module })
            }

            if (pkg.browser) {
                if (typeof pkg.browser !== 'string') {
                    throw new Error('Not implemented for browser field object.')
                }
                addBuild(exploreMapptedEntry(pkg.browser), { format: 'iife', file: pkg.browser })
            }

            if (pkg.bin) {
                if (typeof pkg.bin === 'string') {
                    addBuild(exploreMapptedEntry(pkg.bin), { file: pkg.bin })
                } else {
                    for (const eachCommandName in pkg.bin) {
                        const eachCommandFile = pkg.bin[eachCommandName]
                        addBuild(exploreMapptedEntry(eachCommandFile), { file: eachCommandFile })
                    }
                }
            }
        }

        if (buildMap.size === 0) {
            log.x`No build tasks created`
            log.i`Please check your **package.json** or specify **entries**`
            return
        }

        if (config.build.watch) log.i`Start watching for file changes...`
        const outputResults: OutputResult[] = []
        const printOutputResults = (eachOutputResults: OutputResult[], eachBuildStartTime: [number, number]) => {
            const buildTime = process.hrtime(eachBuildStartTime)
            const colSizes: Record<number, number> = {}
            const chunks: RollupOutputChunk[] = []
            const resolveFilename = (eachOutputResult: OutputResult) => {
                if (eachOutputResult.output.preserveModules) {
                    return eachOutputResult.artifact.fileName
                } else {
                    return relative(eachOutputResult.output.dir, eachOutputResult.output.file)
                }
            }

            for (const eachOutputResult of eachOutputResults) {
                switch (eachOutputResult.artifact.type) {
                    case 'asset':
                        throw new Error('Not implemented for assets.')
                    case 'chunk':
                        chunks.push(eachOutputResult.artifact)
                        colSizes[1] = Math.max(colSizes[1] || 0, resolveFilename(eachOutputResult).length)
                        colSizes[2] = Math.max(colSizes[2] || 0, eachOutputResult.output.format.length)
                        colSizes[3] = Math.max(colSizes[3] || 0, prettyBytes(eachOutputResult.artifact.code.length, { space: false }).length)
                        break
                }
            }

            console.log('')
            eachOutputResults
                .sort((a, b) => resolveFilename(a).length - resolveFilename(b).length || resolveFilename(a).localeCompare(resolveFilename(b)))
                .forEach((eachOutputResult) => {
                    let fileName, format, codeLength
                    switch (eachOutputResult.artifact.type) {
                        case 'asset':
                            throw new Error('Not implemented for assets.')
                        case 'chunk':
                            fileName = align.left('**' + resolveFilename(eachOutputResult) + '**', colSizes[1] + 6)
                            format = align.right(eachOutputResult.output.format, colSizes[2] + 2)
                            codeLength = align.right(prettyBytes(eachOutputResult.artifact.code.length, { space: false }), colSizes[3] + 2)
                            break
                    }
                    log.o(`${fileName} ${format} ${codeLength} ${eachOutputResult.minify && '(minified)' || ''}`)
                })
            console.log('')

            log.ok(clsx(`Built **${chunks.length}** chunks`, config.build.declare && `and types`, `in ${prettyHartime(buildTime).replace(' ', '')}`))
        }
        const buildStartTime = process.hrtime()
        const output = async (rollupBuild: RollupBuild, eachOutputOptionsList: BuildOutputOptions[], outputResults: OutputResult[]) => {
            await Promise.all(
                eachOutputOptionsList.map(async (eachOutputOptions) => {
                    const eachRollupOutputOptions = extend({}, eachOutputOptions.output) as RollupOutputOptions
                    if (eachRollupOutputOptions.file) {
                        // fix: Invalid value for option "output.dir" - you must set either "output.file" for a single-file build or "output.dir" when generating multiple chunks.
                        delete eachRollupOutputOptions.dir
                        // fix: Invalid value for option "output.file" - you must set "output.dir" instead of "output.file" when using the "output.preserveModules" option.
                        delete eachRollupOutputOptions.preserveModules
                    }
                    const result = await rollupBuild.write(eachRollupOutputOptions)
                    result.output
                        .forEach((chunkOrAsset) => {
                            outputResults.push({
                                ...eachOutputOptions,
                                artifact: chunkOrAsset
                            })
                        })
                })
            )
        }
        await Promise.all(
            [
                ...Array.from(buildMap.entries())
                    .map(async ([input, eachBuildOptions]) => {
                        if (config.build.watch) {
                            const watcher = rollupWatch({
                                ...eachBuildOptions.input,
                                watch: {
                                    skipWrite: true
                                }
                            })
                            let buildStartTime
                            watcher
                                .on('event', async (event) => {
                                    if (event.code === 'BUNDLE_START') {
                                        buildStartTime = process.hrtime()
                                    }
                                    if (event.code === 'BUNDLE_END') {
                                        const eachOutputResults = []
                                        await output(event.result, eachBuildOptions.outputOptionsList, eachOutputResults)
                                        printOutputResults(eachOutputResults, buildStartTime)
                                    }
                                    if (event.code === 'ERROR') {
                                        console.error(event.error)
                                    }
                                })
                            watcher.on('change', (id, { event }) => {
                                console.log('')
                                log`[${event.toUpperCase()}] ${relative(process.cwd(), id)}`
                            })
                        } else {
                            const rollupBuild = await rollup(eachBuildOptions.input)
                            await output(rollupBuild, eachBuildOptions.outputOptionsList, outputResults)
                            if (rollupBuild) {
                                // closes the rollupBuild
                                await rollupBuild.close()
                            }
                        }
                    }),
                config.build.declare && new Promise<void>((resolve) => {
                    execaCommand(clsx(
                        'npx tsc --emitDeclarationOnly --preserveWatchOutput --declaration',
                        config.build.output.dir && ' --project ' + config.build.tsconfig,
                        config.build.watch && '--watch'
                    ), {
                        stdio: 'inherit',
                        stripFinalNewline: false,
                        cwd: process.cwd()
                    })
                        .catch(() => {
                            process.exit()
                        })
                        .finally(resolve)
                })
            ]
        )
        if (!config.build.watch) {
            printOutputResults(outputResults, buildStartTime)
        }

    } catch (error) {
        if (error.name === 'RollupError') {
            logRollupError(error as RollupError)
        } else {
            log(error)
        }
        process.exit(1)
    }
}