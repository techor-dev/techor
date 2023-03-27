import esbuildSvelte from 'esbuild-svelte'
import sveltePreprocess from 'svelte-preprocess'

export default {
    /** @type {import('esbuild').BuildOptions} */
    pack: {
        plugins: [
            esbuildSvelte({
                preprocess: sveltePreprocess(),
            })
        ],
    }
}