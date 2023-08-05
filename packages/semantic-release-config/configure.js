const releaseRules = require('./rules')
const extend = require('@techor/extend').default
const { explorePackageManager, readPNPMWorkspaces } = require('@techor/npm')

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
            if (workspaces?.length) {
                newConfig.plugins.push(...workspaces.map((eachWorkspace) => ['@semantic-release/npm', { pkgRoot: eachWorkspace }]))
            }
            break
        case 'npm':
            workspaces = readWorkspaces()
            if (workspaces?.length) {
                newConfig.plugins.push(...workspaces.map((eachWorkspace) => ['semantic-release-pnpm', { pkgRoot: eachWorkspace }]))
            }
            break
    }
    return newConfig
}