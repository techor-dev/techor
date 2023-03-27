import { Plugin } from 'esbuild'
import fs from 'fs'

export const removeImportSvelteModuleExtensionPlugin: Plugin = {
    name: 'remove-import-svelte-module-extension',
    setup(build) {
        const started: any = {}
        started.promise = new Promise(resolve => {
            started.resolve = resolve
        })
        build.onStart(() => {
            started.resolve(true)
        })
        build.onLoad({ filter: /\.(?:ts|tsx|js|jsx|mjs|mts)$/ }, async (args) => {
            if (await started.promise === true) {
                const content = await fs.promises.readFile(args.path, { encoding: 'utf8' })
                return {
                    contents: content
                        .replace(/((?:(?:import|export)(?:.*from | ))|(?:(?:import))\()(')(\.(?:\.)?\/.*)(\.svelte)(')/gmi, (...matches) => {
                            return matches[1] + matches[2] + matches[3] + matches[5]
                        }),
                    loader: 'ts',
                }
            }
        })
    }
}