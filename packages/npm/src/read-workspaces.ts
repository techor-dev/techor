import { readJSONFileSync } from '@techor/fs'
import path from 'path'

export default function readWorkspaces(
    options?: { cwd?: string }
): string[] {
    const pkg = readJSONFileSync(path.resolve(options?.cwd || '', './package.json'))
    return pkg
        ? pkg?.workspaces || []
        : undefined // package.json does not exist
}