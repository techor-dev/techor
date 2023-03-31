import type { Options, Pattern } from 'fast-glob'
import { readFileAsJSON } from '@techor/fs'
import queryWorkspaces from '@techor/query-workspaces'
import upath from 'upath'

export default function readWorkspacePackages(
    patterns: Pattern[] = [],
    options?: Options
): any[] {
    const workspaces = queryWorkspaces(patterns, options)
    return workspaces.length
        ? workspaces
            .map((eachWorkspace: string) =>
                readFileAsJSON(upath.join(eachWorkspace, 'package.json'), options)
            )
        : []

}

export { readWorkspacePackages }