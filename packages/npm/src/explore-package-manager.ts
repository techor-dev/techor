import path from 'path'
import log from '@techor/log'
import { existsSync } from 'fs'

export default function explorePackageManager(
    options?: { cwd?: string }
): 'pnpm' | 'npm' | undefined {
    if (existsSync(path.resolve(options?.cwd || '', './pnpm-workspace.yaml'))) {
        log.info`pnpm-workspace.yaml is detected`
        return 'pnpm'
    } else if (existsSync(path.resolve(options?.cwd || '', './package.json'))) {
        log.info`package.json is detected`
        return 'npm'
    }
}
