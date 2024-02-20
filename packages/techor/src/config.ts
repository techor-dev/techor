import { InputOptions as RollupInputOptions, OutputOptions as RollupOutputOptions } from 'rollup'
import { TransformOptions as ESBuildTransformOptions } from 'esbuild'
import { Options as SWCOptions } from '@swc/core'
import { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve'
import { RollupCommonJSOptions } from '@rollup/plugin-commonjs'

const config: Config = {
    build: {
        dir: 'dist',
        srcDir: 'src',
        formats: ['cjs', 'esm'],
        clean: true,
        input: {
            plugins: [],
            external: []
        },
        output: {
            plugins: []
        },
        nodeResolve: {
            extensions: ['.ts', '.tsx', '.mjs', '.cjs', '.js', '.jsx', '.json'],
            exportConditions: ['node', 'import', 'require', 'default']
        },
        commonjs: { extensions: ['.js', '.ts'] },
        swc: {},
        esmShim: true
    }
}

export default config

export interface Config {
    build: BuildOptions
}

export interface BuildCommonOptions {
    srcDir?: string
    dir?: string
    clean?: boolean
    watch?: boolean
    minify?: boolean
    declare?: boolean
    external?: string[]
    formats?: RollupOutputOptions['format'][]
}

export interface BuildOptions extends BuildCommonOptions {
    // https://rollupjs.org/javascript-api/#inputoptions-object
    input?: RollupInputOptions
    // https://rollupjs.org/javascript-api/#outputoptions-object
    output?: RollupOutputOptions
    // https://swc.rs/docs/configuration/compilation
    swc?: SWCOptions | false
    // https://github.com/rollup/plugins/tree/master/packages/node-resolve#options
    nodeResolve?: RollupNodeResolveOptions | false;
    // https://esbuild.github.io/api/#transform
    esbuildTransform?: ESBuildTransformOptions | false
    // We made `techor-esm-shim` because `@rollup/plugin-esm-shim` breaks the source code.
    esmShim?: boolean
    // https://github.com/rollup/plugins/tree/master/packages/commonjs#options
    commonjs?: RollupCommonJSOptions | false
}