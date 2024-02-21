import { explorePathsSync } from '@techor/glob'
import { readPNPMWorkspaces, readWorkspaces, explorePackageManager } from '@techor/npm'
import path from 'path'
import log from '@techor/log'
import { readJSONFileSync, writeFileSync } from '@techor/fs'
import yargsParser, { Options as YargsParserOptions } from 'yargs-parser'
import exploreConfig from 'explore-config'
import extend from '@techor/extend'
import { Config, default as defaultConfig } from '../config'

export const yargsParserOptions: YargsParserOptions = {
    alias: {
        operator: 'o', // `^`, `~`, `>`, `>=`, `<`, `<=` ', '^'
        workspaces: 'w',
        list: 'ls'
    },
    configuration: {
        'strip-aliased': true,
        'strip-dashed': true
    }
}

export default async function version() {
    const { _, ...cmdConfig } = yargsParser(process.argv.slice(2), yargsParserOptions)
    const [commandName, version] = _ as [string, ...string[]]
    const useConfig = exploreConfig('techor.config.*') as Config
    const config = extend(defaultConfig, useConfig, { version: cmdConfig }) as Config
    if (!config.version.workspaces) {
        const packageManager = explorePackageManager()
        switch (packageManager) {
            case 'pnpm':
                config.version.workspaces = readPNPMWorkspaces()
                break
            case 'npm':
                config.version.workspaces = readWorkspaces()
                break
        }
    }
    if (!config.version.workspaces?.length) {
        log.x`workspaces is not defined in package.json`
    }
    const packagesOfPath = {}
    const packagesOfName = {}
    const workspacePackagePaths = config.version.workspaces.map((eachWorkspace) => path.join(eachWorkspace, '*package.json'))
    const resolveVersion = (eachVersion: string) => {
        if (eachVersion.startsWith('workspace:')) {
            return eachVersion.replace('workspace:', '') + version
        } else if (eachVersion === '') {
            return config.version.operator + version
        }
    }
    const updateDependencies = (eachDependencies) => {
        for (const dependencyName in eachDependencies) {
            if (dependencyName in packagesOfName) {
                const dependencyVersion = eachDependencies[dependencyName]
                const resolvedVersion = resolveVersion(dependencyVersion)
                if (resolvedVersion) {
                    eachDependencies[dependencyName] = resolvedVersion
                }
            }
        }
    }

    // Read package.json by workspaces
    for (const eachPackagePath of explorePathsSync(workspacePackagePaths)) {
        const eachPackage = readJSONFileSync(path.resolve(eachPackagePath))
        // Prevent version bumps of private package
        packagesOfPath[eachPackagePath] = eachPackage
        packagesOfName[eachPackage.name] = eachPackage
        // Bump to next verion
        eachPackage.version = version
    }

    for (const eachPackagePath in packagesOfPath) {
        const eachPackage = packagesOfPath[eachPackagePath]
        const { dependencies, devDependencies, peerDependencies } = packagesOfPath[eachPackagePath]
        dependencies && updateDependencies(dependencies)
        devDependencies && updateDependencies(devDependencies)
        peerDependencies && updateDependencies(peerDependencies)
        if (!config.version.list) {
            writeFileSync(eachPackagePath, eachPackage)
        }
    }

    const workspaceDepsTree = {}
    for (const name in packagesOfName) {
        const { dependencies, peerDependencies, devDependencies } = packagesOfName[name]
        const workspacePackage: any = workspaceDepsTree[log.paint('**' + name + '**')] = {}
        const analyzeDeps = (eachDeps, key: string) => {
            if (eachDeps) {
                workspacePackage[key] = {}
                for (const dependencyName in eachDeps) {
                    if (dependencyName in packagesOfName) {
                        const eachDependencyVersion = eachDeps[dependencyName]
                        workspacePackage[key][log.paint('**' + dependencyName + '**')] = eachDependencyVersion || null
                    }
                }
            }
        }
        analyzeDeps(dependencies, 'dependencies')
        analyzeDeps(peerDependencies, 'peerDependencies')
        analyzeDeps(devDependencies, 'devDependencies')
        /* 防止沒有印出空 {} 的項目 */
        if (!Object.keys(workspaceDepsTree[log.paint('**' + name + '**')]).length) {
            workspaceDepsTree[log.paint('**' + name + '**')] = null
        }
    }
    log`📦`
    log.tree(workspaceDepsTree)
    log.success`bump version to ${version} for ${Object.keys(packagesOfName).length} packages in all workspace`
}