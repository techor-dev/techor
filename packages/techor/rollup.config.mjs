import FastGlob from 'fast-glob'
import commonOptions from '../../rollup.config.mjs'

/** @type {import('rollup').RollupOptions} */
export default [
    {
        ...commonOptions,
        input: FastGlob.sync('src/**/*.ts'),
        output: [
            { dir: 'dist', format: 'esm', preserveModules: true, preserveModulesRoot: 'src', entryFileNames: '[name].mjs' }
        ]
    }
]