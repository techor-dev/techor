import fg from 'fast-glob'
import type { Options, Pattern } from 'fast-glob'
import { readFileAsJSON } from 'to-fs'
import extend from 'to-extend'

export default function queryWorkspaces(
    patterns: Pattern[] = [],
    options?: Options
): string[] {
    options = extend({
        cwd: process.cwd(),
        ignore: ['**/node_modules/**']
    }, options)
    patterns = patterns?.length
        ? patterns
        : readFileAsJSON('./package.json', { cwd: options.cwd })?.workspaces
    return patterns?.length
        ? fg.sync(patterns.map((eachWorkspace) => eachWorkspace + '/package.json'), options)
            .map((eachWorkspace) => eachWorkspace.replace('/package.json', ''))
        : []
}

export { queryWorkspaces }