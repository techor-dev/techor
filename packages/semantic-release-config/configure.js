const releaseRules = require('./rules')
const extend = require('@techor/extend').default
const { explorePackageManager, readPNPMWorkspaces, readWorkspaces, queryWorkspaces } = require('@techor/npm')

const defaultConfig = {
    branches: [
        '+([0-9])?(.{+([0-9]),x}).x',
        'main',
        'next',
        'next-major',
        {
            name: 'beta',
            prerelease: true
        },
        {
            name: 'alpha',
            prerelease: true
        }
    ],
    plugins: {
        '@semantic-release/commit-analyzer': { preset: 'techor', releaseRules },
        '@semantic-release/release-notes-generator': { preset: 'techor' },
        '@semantic-release/exec': {
            prepareCmd: 'techor version ${nextRelease.version}'
        },
        '@semantic-release/github': true
    }
}

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
        console.log('Workspaces found:', resolvedWorkspaces)
        newConfig.plugins.push(...resolvedWorkspaces.map((eachWorkspace) => ['@semantic-release/npm', { pkgRoot: eachWorkspace }]))
    }
    return newConfig
}