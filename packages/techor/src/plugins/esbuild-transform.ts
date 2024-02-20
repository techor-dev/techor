import type { Plugin } from 'rollup'
import { transform, CommonOptions, TransformOptions } from 'esbuild'

export default function esbuildTransform(options?: TransformOptions): Plugin {
    return {
        name: 'techor-esbuild-transform',
        async renderChunk(code, _, normalizedOutputOptions) {
            let sourcemap: CommonOptions['sourcemap']
            let format: CommonOptions['format']
            switch (normalizedOutputOptions.format) {
                case 'es':
                    format = 'esm'
                    break
                case 'iife':
                    format = 'iife'
                    break
                default:
                    format = 'cjs'
            }
            switch (normalizedOutputOptions.sourcemap) {
                case 'inline':
                    sourcemap = 'inline'
                    break
                case true:
                    sourcemap = 'external'
                    break
                case false:
                    sourcemap = false
                    break
                default:
                    sourcemap = true

            }
            return await transform(code, {
                format,
                loader: 'js',
                minify: true,
                sourcemap,
                ...options,
            })
        }
    }
}