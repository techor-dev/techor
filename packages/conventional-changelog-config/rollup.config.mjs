import commonOptions from '../../rollup.config.mjs'

/** @type {import('rollup').RollupOptions} */
export default {
    ...commonOptions,
    input: 'src/index.ts',
    output: { file: 'dist/index.js', format: 'cjs' },
}