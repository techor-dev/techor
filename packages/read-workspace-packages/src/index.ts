import type { Options, Pattern } from 'fast-glob'
import { readJSONFileSync } from '@techor/fs'
import queryWorkspaces from '@techor/query-workspaces'
import path from 'path'

export default function readWorkspacePackages(
    patterns: Pattern[] = [],
    options?: Options
): any[] {
    const workspaces = queryWorkspaces(patterns, options)
    return workspaces.length
        ? workspaces
            .map((eachWorkspace: string) =>
                readJSONFileSync(path.join(options?.cwd || '', eachWorkspace, 'package.json'))
            )
        : []

}

export { readWorkspacePackages }