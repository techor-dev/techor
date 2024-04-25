import defineConfig from '../../rollup.config.mjs'

/** @type {import('rollup').RollupOptions} */
export default {
    ...defineConfig(),
    input: 'src/index.ts',
    output: { file: 'dist/index.js', format: 'cjs' },
}