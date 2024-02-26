import path from 'path'
import extend from '@techor/extend'
import { explorePackageManager, readPNPMWorkspaces, readWorkspaces, queryWorkspaces } from '@techor/npm'
import { readJSONFileSync } from '@techor/fs'
import log from '@techor/log'
import defaultConfig from './config'
import type { GlobalConfig } from 'semantic-release'

export default function configure(config?: any) {
    const newConfig = extend(defaultConfig, config) as GlobalConfig
    newConfig.plugins = Object.keys(newConfig.plugins)
        .map((eachPluginName) => {
            const eachPluginConfig = newConfig.plugins[eachPluginName]
            if (eachPluginConfig === true) {
                return eachPluginName
            } else if (eachPluginConfig) {
                return [eachPluginName, eachPluginConfig]
            } else {
                return null
            }
        })
        .filter((eachPlugin) => eachPlugin) as any
    let workspaces
    const packageManager = explorePackageManager()
    switch (packageManager) {
        case 'pnpm':
            workspaces = readPNPMWorkspaces()
            break
        case 'npm':
            workspaces = readWorkspaces()
            break
    }
    if (workspaces?.length) {
        const resolvedWorkspaces = queryWorkspaces(workspaces)
        for (const eachWorkspace of resolvedWorkspaces) {
            const eachWorkspacePackage = readJSONFileSync(path.join(eachWorkspace, 'package.json'))
            if (eachWorkspacePackage?.publishConfig?.access === 'public') {
                log.add`Add npm release for **${eachWorkspace}**`;
                (newConfig.plugins as any).push(['@semantic-release/npm', { pkgRoot: eachWorkspace }])
            } else {
                log.i`Skip npm release for **${eachWorkspace}**`
            }
        }
    }
    return newConfig
}