const path = require('path')
const extend = require('@techor/extend')
const { explorePackageManager, readPNPMWorkspaces, readWorkspaces, queryWorkspaces } = require('@techor/npm')
const { readJSONFileSync } = require('@techor/fs')
const log = require('@techor/log')
const defaultConfig = require('./config')

module.exports = (config) => {
    const newConfig = extend(defaultConfig, config)
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
        .filter((eachPlugin) => eachPlugin)
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
                log.add`Add npm release for **${eachWorkspace}**`
                newConfig.plugins.push(['@semantic-release/npm', { pkgRoot: eachWorkspace }])
            } else {
                log.i`Skip npm release for **${eachWorkspace}**`
            }
        }
    }
    return newConfig
}