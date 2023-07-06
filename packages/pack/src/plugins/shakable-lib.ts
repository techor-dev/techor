import type { Plugin } from 'esbuild'
import path from 'upath'

export const createShakableLibPlugin = ({ srcdir }: { srcdir: string }): Plugin => ({
    name: 'shakable-lib-plugin',
    setup(build) {
        const started: any = {}
        started.promise = new Promise(resolve => {
            started.resolve = resolve
        })
        build.onStart(() => {
            started.resolve(true)
        })
        build.onResolve({ filter: /\.(?:ts|tsx|js|jsx|mjs|mts|css)$/ }, args => {
            return {
                path: path.join(args.resolveDir, args.path),
                external: path.normalize(args.path).startsWith(srcdir)
            }
        })
    }
})