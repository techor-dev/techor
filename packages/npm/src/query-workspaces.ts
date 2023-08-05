import { explorePathsSync } from '@techor/glob'
import type { Options, Pattern } from 'fast-glob'
import extend from '@techor/extend'
import readWorkspaces from './read-workspaces'

export default function queryWorkspaces(
    patterns: Pattern[],
    options?: Options
): string[] {
    options = extend({ ignore: ['**/node_modules/**'] }, options)
    patterns = patterns?.length ? patterns : readWorkspaces(options)
    return patterns?.length
        ? explorePathsSync(patterns.map((eachWorkspace) => eachWorkspace + '/package.json'), options)
            .map((eachWorkspace) => eachWorkspace.replace('/package.json', ''))
        : []
}
