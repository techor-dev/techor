import FastGlob from 'fast-glob'
import defineConfig from '../../rollup.config.mjs'

/** @type {import('rollup').RollupOptions} */
export default [
    {
        ...defineConfig(),
        input: FastGlob.sync('src/**/*.ts'),
        output: [
            { dir: 'dist', format: 'esm', preserveModules: true, preserveModulesRoot: 'src', entryFileNames: '[name].mjs' }
        ]
    }
]