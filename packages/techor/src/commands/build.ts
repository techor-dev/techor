import { readJSONFileSync } from '@techor/fs'
import log from '@techor/log'
import type { Command } from 'commander'
import { existsSync, rmSync } from 'fs'
import type { PackageJson } from 'pkg-types'
import { OutputChunk as RollupOutputChunk, OutputOptions as RollupOutputOptions, OutputPlugin as RollupOutputPlugin, InputOptions as RollupInputOptions, RollupOutput, RollupError, rollup, OutputAsset as RollupOutputAsset, watch as rollupWatch, RollupBuild, InputPluginOption as RollupInputPluginOption } from 'rollup'
import extend from '@techor/extend'
import { explorePathsSync } from '@techor/glob'
import { basename, extname, join, normalize, relative } from 'path'
import upath from 'upath'
import prettyBytes from 'pretty-bytes'
import align from 'wide-align'
import prettyHartime from 'pretty-hrtime'
import logRollupError from '../utils/log-rollup-error'
import { execaCommand } from 'execa'
import clsx from 'clsx'
import getWideExternal from '../utils/get-wide-external'
import { BuildCommonOptions, Config, default as defaultConfig } from '../config'

// core plugins
import esmShim from '../plugins/esm-shim'
import esbuildTransform from '../plugins/esbuild-transform'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import swc from '@rollup/plugin-swc'
import exploreConfig from 'explore-config'

const FORMAT_OF_EXT = {
    '.js': 'umd',
    '.cjs': 'cjs',
    '.mjs': 'esm',
    '.ts': 'dts'
}

const EXT_OF_FORMAT = {
    esm: '.mjs',
    es: '.mjs',
    module: '.mjs',
    cjs: '.cjs',
    commongjs: '.cjs',
    iife: '.js',
    amd: '.js',
    system: '.js',
    systemjs: '.js'
}

const SRCFILE_EXT = '.{js,ts,jsx,cjs,tsx,mjs,mts}'

declare type OutputResults = (BuildOutputOptions & { artifact: (RollupOutputAsset | RollupOutputChunk) })[]
declare type BuildOutputOptions = BuildCommonOptions & { output: RollupOutputOptions }
declare type BuildOptions = {
    input: RollupInputOptions,
    outputOptionsList: BuildOutputOptions[]
}

export default (program: Command) => program.command('build [entryPaths...]')
    .alias('dev')
    // https://rollupjs.org/configuration-options
    .option('-f, --formats [formats...]')
    .option('-w, --watch')
    .option('-c, --clean')
    .option('--src-dir <dirname>')
    .option('--dir <dirname>')
    .option('--minify')
    .option('--declare')
    .option('--no-external')
    .option('--no-declare')
    // rollup output options
    .option('-o, --file <filename>')
    .option('-e, --external [packages...]', '', [])
    .action(async function (commandInputs: string[], { file, external, ...commandBuildOptions }) {
        try {
            const useConfig = exploreConfig('techor.config.*') as Config
            const config = extend(defaultConfig, useConfig, { build: commandBuildOptions }) as Config

            if (file !== undefined) config.build.output.file = file
            if (external !== undefined) config.build.external = external

            if (process.env.DEBUG) console.log('[DEBUG] commandBuildOptions', commandBuildOptions)
            const pkg: PackageJson = readJSONFileSync('package.json') || {}
            const { dependencies, peerDependencies, optionalDependencies, types } = pkg
            const buildMap = new Map<RollupInputOptions['input'], BuildOptions>()

            if (config.build.declare === undefined && types) config.build.declare = true
            if (this.args[0] === 'dev') {
                config.build.watch = true
            }

            if (Array.isArray(config.build.external)) {
                if (dependencies) config.build.external.push(...Object.keys(dependencies))
                if (peerDependencies) config.build.external.push(...Object.keys(peerDependencies))
                if (optionalDependencies) config.build.external.push(...Object.keys(optionalDependencies))
            }

            // remove output dir first
            if (config.build.clean && existsSync(config.build.dir)) {
                rmSync(config.build.dir, { force: true, recursive: true })
                log.i`Cleaned up **${config.build.dir}**`
            }

            // eslint-disable-next-line no-inner-declarations
            function addBuild(input: string, rollupOutputOptions: RollupOutputOptions) {
                input = normalize(input)
                if (!rollupOutputOptions.format) {
                    rollupOutputOptions.format = FORMAT_OF_EXT[extname(rollupOutputOptions.file)]
                }
                const fileBasenameSplits = basename(rollupOutputOptions.file).split('.')
                const outputOptions = extend(config.build, { output: rollupOutputOptions }) as BuildOutputOptions
                if (fileBasenameSplits.includes('min')) outputOptions.minify = true
                const isGlobalFile = fileBasenameSplits.includes('global')
                if (isGlobalFile || fileBasenameSplits.includes('iife')) outputOptions.output.format = 'iife'
                for (const [eachInput, eachBuildOptions] of buildMap) {
                    for (const eachOutputOptions of eachBuildOptions.outputOptionsList) {
                        if (normalize(eachOutputOptions.output.file) === normalize(outputOptions.output.file)) {
                            if (process.env.DEBUG) console.log('[DEBUG] outputOptions', outputOptions)
                            return
                        }
                    }
                }
                if (config.build.esbuildTransform || outputOptions.minify) {
                    (outputOptions.output.plugins as RollupOutputOptions['plugins'][]).push(esbuildTransform())
                }
                let buildOptions = buildMap.get(input)
                if (buildOptions) {
                    // 合併同一個 input 來源並對應多個 RollupOutputOptions 避免重新 parse 相同的 input
                    (buildOptions.outputOptionsList).push(outputOptions)
                } else {
                    buildOptions = {
                        outputOptionsList: [outputOptions]
                    } as BuildOptions
                    buildOptions.input = extend({}, config.build.input)
                    buildOptions.input.input = input
                    buildOptions.input.external = (config.build.external && !isGlobalFile) && getWideExternal(config.build.external || []);
                    (buildOptions.input.plugins as RollupInputPluginOption[]).unshift(
                        ...[
                            config.build.swc && swc(config.build.swc),
                            config.build.commonjs && commonjs(config.build.commonjs),
                            config.build.nodeResolve && nodeResolve(config.build.nodeResolve),
                            config.build.esmShim && esmShim(),
                        ]
                            .filter((existence) => existence)
                    )
                    if (process.env.DEBUG) console.log('[DEBUG] buildOptions', buildOptions)
                    buildMap.set(input, buildOptions)
                }
            }

            if (commandInputs.length) {
                const foundEntries = explorePathsSync(commandInputs)
                for (const eachEntry of foundEntries) {
                    config.build.formats.map((eachFormat) => {
                        addBuild(eachEntry, {
                            format: eachFormat,
                            file: config.build.output.file || join(config.build.dir, relative(config.build.srcDir, upath.changeExt(eachEntry, EXT_OF_FORMAT[eachFormat])))
                        })
                    })
                }
            } else {
                log.i`Detected entries (package.json)`

                const exploreMapptedEntry = (filePath: string, targetExt: string) => {
                    const subFilePath = upath.relative(config.build.dir, filePath)
                    const srcFilePath = upath.join(config.build.srcDir, subFilePath)
                    const pattern = upath.changeExt(srcFilePath, targetExt)
                    const foundEntries = explorePathsSync(pattern)
                    if (!foundEntries.length) {
                        throw new Error(`Cannot find the entry file **${pattern}**`)
                    }
                    return foundEntries[0]
                }

                if (pkg.exports) {
                    (function handleExports(eachExports: any, eachFormat?: RollupOutputOptions['format']) {
                        if (typeof eachExports === 'string') {
                            addBuild(exploreMapptedEntry(eachExports, SRCFILE_EXT), {
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
                                    }
                                }
                            }
                        }
                    })(pkg.exports)
                }

                if (pkg.main) {
                    addBuild(exploreMapptedEntry(pkg.main, SRCFILE_EXT), { file: pkg.main })
                }

                if (pkg.module) {
                    addBuild(exploreMapptedEntry(pkg.module, SRCFILE_EXT), { format: 'esm', file: pkg.module })
                }

                if (pkg.browser) {
                    addBuild(exploreMapptedEntry(pkg.browser, SRCFILE_EXT), { format: 'iife', file: pkg.browser })
                }

                if (pkg.bin) {
                    if (typeof pkg.bin === 'string') {
                        addBuild(exploreMapptedEntry(pkg.bin, SRCFILE_EXT), { file: pkg.bin })
                    } else {
                        for (const eachCommandName in pkg.bin) {
                            const eachCommandFile = pkg.bin[eachCommandName]
                            addBuild(exploreMapptedEntry(eachCommandFile, SRCFILE_EXT), { file: eachCommandFile })
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
            const outputResults: OutputResults = []
            const printOutputResults = (eachOutputResults: OutputResults, eachBuildStartTime: [number, number]) => {
                const buildTime = process.hrtime(eachBuildStartTime)
                const colSizes: Record<number, number> = {}
                const chunks: RollupOutputChunk[] = []

                for (const eachOutputResult of eachOutputResults) {
                    switch (eachOutputResult.artifact.type) {
                        case 'asset':
                            // colSizes[1] = Math.max(colSizes[1] || 0, output.fileName.length)
                            // colSizes[2] = Math.max(colSizes[2] || 0, FORMAT_OF_EXT[extname(output.fileName)].length)
                            // colSizes[3] = Math.max(colSizes[3] || 0, prettyBytes(output.source.length, { space: false }).length)
                            throw new Error('Not implemented for assets.')
                        case 'chunk':
                            chunks.push(eachOutputResult.artifact)
                            // eslint-disable-next-line no-case-declarations
                            colSizes[1] = Math.max(colSizes[1] || 0, (relative(eachOutputResult.dir, eachOutputResult.output.file)).length)
                            colSizes[2] = Math.max(colSizes[2] || 0, eachOutputResult.output.format.length)
                            colSizes[3] = Math.max(colSizes[3] || 0, prettyBytes(eachOutputResult.artifact.code.length, { space: false }).length)
                            break
                    }
                }

                console.log('')
                eachOutputResults
                    .sort((a, b) => a.output.file.length - b.output.file.length || a.output.file.localeCompare(b.output.file))
                    .forEach((eachOutputResult) => {
                        let fileName, format, codeLength
                        switch (eachOutputResult.artifact.type) {
                            case 'asset':
                                // fileName = align.left('**' + output.fileName + '**', colSizes[1] + 6)
                                // format = align.right(FORMAT_OF_EXT[extname(output.fileName)], colSizes[2] + 2)
                                // codeLength = align.right(prettyBytes(output.source.length, { space: false }), colSizes[3] + 2)
                                throw new Error('Not implemented for assets.')
                            case 'chunk':
                                fileName = align.left('**' + relative(config.build.dir, eachOutputResult.output.file) + '**', colSizes[1] + 6)
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
            const output = async (rollupBuild: RollupBuild, eachOutputOptionsList: BuildOutputOptions[], outputResults: OutputResults) => {
                await Promise.all(
                    eachOutputOptionsList.map(async (eachOutputOptions) => {
                        const result = await rollupBuild.write(eachOutputOptions.output)
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
                                            if (config.build.declare) console.log('')
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
                            config.build.dir && '--outDir ' + config.build.dir,
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
    })