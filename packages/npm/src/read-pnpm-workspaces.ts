import { readFileSync } from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export default function readPNPMWorkspaces(
    options?: { cwd?: string }
): string[] {
    const pnpmWorkspaceContent = readFileSync(path.resolve(options?.cwd || '', './pnpm-workspace.yaml'))
    if (pnpmWorkspaceContent) {
        const pnpmWorkspaceJSON = yaml.load(pnpmWorkspaceContent)
        return pnpmWorkspaceJSON.packages || []
    } else {
        return undefined // pnpm-workspace.yaml does not exist
    }
}