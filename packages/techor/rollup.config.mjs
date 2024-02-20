import commonOptions from '../../rollup.config.mjs'

/** @type {import('rollup').RollupOptions} */
export default [
    {
        ...commonOptions,
        input: 'src/bin/index.ts',
        output: { file: 'dist/bin/index.mjs', format: 'esm' }
    },
    {
        ...commonOptions,
        input: 'src/index.ts',
        output: [
            { file: 'dist/index.cjs', format: 'cjs' },
            { file: 'dist/index.mjs', format: 'esm' }
        ]
    }
]