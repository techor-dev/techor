import type { Plugin } from 'rollup'
import { getTsconfig, TsConfigJson } from 'get-tsconfig'
import { JscTarget, Options as SWCOptions, transform } from '@swc/core'
import extend from '@techor/extend'
import { FilterPattern, createFilter } from '@rollup/pluginutils'

export type Options = SWCOptions & {
    include?: FilterPattern
    exclude?: FilterPattern
    tsconfigFile?: string | boolean
}

export default function swc({ tsconfigFile, include, exclude, minify, ...options }: Options = {}, tsconfig: TsConfigJson): Plugin {
    const filter = createFilter(include, exclude)
    let swcOptions = {
        jsc: {
            parser: {},
            transform: {}
        }
    } as SWCOptions
    swcOptions = extend(swcOptions, options)
    if (tsconfig?.compilerOptions?.experimentalDecorators) {
        swcOptions.jsc.parser.decorators = true
        swcOptions.jsc.transform.legacyDecorator = true
        swcOptions.jsc.transform.decoratorMetadata = tsconfig?.compilerOptions.emitDecoratorMetadata
    }
    if (tsconfig?.compilerOptions?.jsx) {
        swcOptions.jsc.transform.react = {
            pragma: tsconfig?.compilerOptions.jsxFactory,
            pragmaFrag: tsconfig?.compilerOptions.jsxFragmentFactory,
            importSource: tsconfig?.compilerOptions.jsxImportSource,
        }
    }
    if (tsconfig?.compilerOptions?.target) {
        swcOptions.jsc.target = tsconfig?.compilerOptions.target.toLocaleLowerCase() as JscTarget
    }
    return {
        name: 'techor-swc',
        async transform(code, id) {
            if (!filter(id)) return null
            const transformed = await transform(code, {
                filename: id,
                sourceMaps: true,
                ...extend(swcOptions, {
                    jsc: {
                        parser: /\.tsx?$/.test(id)
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