import { InputOptions as RollupInputOptions, OutputOptions as RollupOutputOptions } from 'rollup'
import type { Options as SWCOptions } from './plugins/swc'
import { RollupNodeResolveOptions } from '@rollup/plugin-node-resolve'
import { RollupCommonJSOptions } from '@rollup/plugin-commonjs'

const config: Config = {
    build: {
        srcDir: 'src',
        formats: ['cjs', 'esm'],
        watch: false,
        minify: false,
        declare: undefined,
        clean: true,
        input: {
            plugins: [],
            external: []
        },
        output: {
            dir: 'dist',
            preserveModules: true,
            plugins: []
        },
        nodeResolve: {
            extensions: ['.ts', '.tsx', '.mjs', '.cjs', '.js', '.jsx', '.json'],
            exportConditions: ['node', 'import', 'require', 'default'],
            preferBuiltins: true
        },
        commonjs: { extensions: ['.js', '.ts'] },
        swc: {
            include: /\.[jt]sx?$/,
            exclude: ['node_modules'],
            jsc: {
                target: 'esnext',
                externalHelpers: false,
                keepClassNames: true,
                minify: {
                    mangle: true,
                    compress: true
                }
            }
        },
        esmShim: true,
        preserveDirectives: {},
        extOfFormat: {
            esm: '.mjs',
            es: '.mjs',
            module: '.mjs',
            cjs: '.cjs',
            commonjs: '.cjs',
            iife: '.js',
            amd: '.js',
            umd: '.js',
            system: '.js',
            systemjs: '.js'
        },
        formatOfExt: {
            '.js': 'umd',
            '.cjs': 'cjs',
            '.mjs': 'esm'
        },
        sourceExtensions: ['js', 'jsx', 'ts', 'tsx', 'cjs', 'cts', 'mjs', 'mts'],
        tsconfig: 'tsconfig.prod.json'
    },
    version: {
        operator: '^'
    }
}

export default config

export interface Config {
    build?: BuildOptions
    version?: VersionOptions
}

export interface BuildCommonOptions {
    srcDir?: string
    clean?: boolean
    watch?: boolean
    minify?: boolean
    declare?: boolean
    external?: string[]
    tsconfig?: string
    formats?: RollupOutputOptions['format'][]
    env?: 'development' | 'production'
}

export interface BuildOptions extends BuildCommonOptions {
    // https://rollupjs.org/javascript-api/#inputoptions-object
    input?: RollupInputOptions
    // https://rollupjs.org/javascript-api/#outputoptions-object
    output?: RollupOutputOptions
    // https://swc.rs/docs/configuration/compilation
    swc?: SWCOptions
    // https://github.com/rollup/plugins/tree/master/packages/node-resolve#options
    nodeResolve?: RollupNodeResolveOptions | false;
    // We made `techor-esm-shim` because `@rollup/plugin-esm-shim` breaks the source code.
    esmShim?: boolean
    // https://github.com/Ephem/rollup-plugin-preserve-directives
    preserveDirectives?: {
        suppressPreserveModulesWarning?: boolean;
        include?: string[];
        exclude?: string[];
    } | false
    commonjs?: RollupCommonJSOptions | false
    extOfFormat?: Record<RollupOutputOptions['format'], string>
    formatOfExt?: Record<string, RollupOutputOptions['format']>
    sourceExtensions?: string[]
}

export interface VersionOptions {
    operator?: '^' | '~' | '>' | '>=' | '<' | '<=' | ''
    workspaces?: string[]
    list?: boolean
}