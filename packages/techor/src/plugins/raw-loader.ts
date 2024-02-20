import type { Plugin } from 'rollup'
import { FilterPattern, createFilter } from '@rollup/pluginutils'
import { readFileSync } from 'fs'

export default function rawLoader(include?: FilterPattern, { exclude, resolve }: {
    exclude?: FilterPattern,
    resolve?: string | false | null
} = {}): Plugin {
    const filter = createFilter(include, exclude, { resolve })
    return {
        name: 'techor-raw-loader',
        load(id) {
            if (filter(id)) {
                return {
                    code: `export default ${JSON.stringify(readFileSync(id, 'utf-8'))};`,
                    map: { mappings: '' }
                }
            }
        }
    } as Plugin
}