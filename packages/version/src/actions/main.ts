import { explorePathsSync } from '@techor/glob'
import path from 'path'
import log, { paint } from '@techor/log'
import { readJSONFileSync, writeFileSync } from '@techor/fs'
import { readPNPMWorkspaces, readWorkspaces, explorePackageManager } from '@techor/npm'

module.exports = function action(version: string, options) {
    if (!options.workspaces) {
        const packageManager = explorePackageManager()
        switch (packageManager) {
            case 'pnpm':
                options.workspaces = readPNPMWorkspaces()
                break
            case 'npm':
                options.workspaces = readWorkspaces()
                break
        }
    }
    if (!options.workspaces?.length) {
        log.x`workspaces is not defined in package.json`
    }
    const packagesOfPath = {}
    const packagesOfName = {}
    const workspacePackagePaths = options.workspaces.map((eachWorkspace) => path.join(eachWorkspace, '*package.json'))
    const resolveVersion = (eachVersion: string) => {
        if (eachVersion.startsWith('workspace:')) {
            return eachVersion.replace('workspace:', '') + version
        } else if (eachVersion === '') {
            return options.prefix + version
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
        if (
            eachPackage.private && (options.private) ||
            !eachPackage.private && (options.public)
        ) {
            packagesOfPath[eachPackagePath] = eachPackage
            packagesOfName[eachPackage.name] = eachPackage
            // Bump to next verion
            eachPackage.version = version
        }
    }

    for (const eachPackagePath in packagesOfPath) {
        const eachPackage = packagesOfPath[eachPackagePath]
        const { dependencies, peerDependencies } = packagesOfPath[eachPackagePath]
        dependencies && updateDependencies(dependencies)
        peerDependencies && updateDependencies(peerDependencies)
        if (!options.list) {
            writeFileSync(eachPackagePath, eachPackage)
        }
    }

    const workspaceDepsTree = {}
    for (const name in packagesOfName) {
        const { dependencies, peerDependencies } = packagesOfName[name]
        const workspacePackage: any = workspaceDepsTree[paint('**' + name + '**')] = {}
        const analyzeDeps = (eachDeps, key: string) => {
            if (eachDeps) {
                workspacePackage[key] = {}
                for (const dependencyName in eachDeps) {
                    if (dependencyName in packagesOfName) {
                        const eachDependencyVersion = eachDeps[dependencyName]
                        workspacePackage[key][paint('**' + dependencyName + '**')] = eachDependencyVersion || null
                    }
                }
            }
        }
        analyzeDeps(dependencies, 'dependencies')
        analyzeDeps(peerDependencies, 'peerDependencies')
        /* 防止沒有印出空 {} 的項目 */
        if (!Object.keys(workspaceDepsTree[paint('**' + name + '**')]).length) {
            workspaceDepsTree[paint('**' + name + '**')] = null
        }
    }
    log`📦`
    log.tree(workspaceDepsTree)
    log.success`bump version to ${version} for ${Object.keys(packagesOfName).length} packages in all workspace`
}