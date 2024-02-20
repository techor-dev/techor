import type { Plugin } from 'rollup'
// @ts-expect-error Cannot find module 'load-tsconfig' or its corresponding type declarations.ts(2307)
import { loadTsConfig } from 'load-tsconfig'
import { Options as SWCOptions, transform } from '@swc/core'
import extend from '@techor/extend'
import { FilterPattern, createFilter } from '@rollup/pluginutils'

export type Options = SWCOptions & {
    include?: FilterPattern
    exclude?: FilterPattern
    tsconfigFile?: string | boolean
}

export default function swc({ tsconfigFile, include, exclude, minify, ...options }: Options = {}): Plugin {
    const filter = createFilter(include, exclude)
    const compilerOptions = tsconfigFile === false ? {} : loadTsConfig('.', tsconfigFile === true ? undefined : tsconfigFile)?.data?.compilerOptions || {}
    let swcOptions = {
        jsc: {
            target: compilerOptions.target,
            parser: {},
            transform: {}
        }
    } as SWCOptions
    if (compilerOptions.experimentalDecorators) {
        swcOptions.jsc.parser.decorators = true
        swcOptions.jsc.transform.legacyDecorator = true
        swcOptions.jsc.transform.decoratorMetadata = compilerOptions.emitDecoratorMetadata
    }
    if (compilerOptions.jsx) {
        swcOptions.jsc.transform.react = {
            pragma: compilerOptions.jsxFactory,
            pragmaFrag: compilerOptions.jsxFragmentFactory,
            importSource: compilerOptions.jsxImportSource,
        }
    }
    swcOptions = extend(swcOptions, options)
    return {
        name: 'techor-swc',
        async transform(code, id) {
            if (!filter(id)) return null
            const transformed = await transform(code, {
                filename: id,
                sourceMaps: true,
                ...extend(swcOptions, {
                    jsc: {
                        parser: /\.ts?$/.test(id)
                            ? { syntax: 'typescript', tsx: /\.tsx$/.test(id) }
                            : { syntax: 'ecmascript', jsx: /\.jsx$/.test(id) }
                    }
                } as SWCOptions)
            })
            return {
                code: transformed.code,
                map: transformed.map && JSON.parse(transformed.map),
            }
        },
        async renderChunk(code, chunk) {
            return minify
                ? await transform(code, {
                    ...swcOptions,
                    sourceMaps: true,
                    minify: true,
                    filename: chunk.fileName,
                })
                : null
        }
    } as Plugin
}