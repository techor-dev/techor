import fg from 'fast-glob'
import path from 'path'
import upath from 'upath'
import log, { paint } from '@techor/log'
import { readJSONFileSync, writeFileSync } from '@techor/fs'

export default function action(version: string, options) {
    const pkg = readJSONFileSync(path.resolve('./package.json'))
    if (!options.workspaces) {
        options.workspaces = pkg.workspaces
    }
    if (!options.workspaces?.length) {
        log.x`workspaces is not defined in package.json`
    }
    const nextVersion = options.prefix + version
    const packagesOfPath = {}
    const packagesOfName = {}
    const workspacePackagePaths = options.workspaces.map((eachWorkspace) => upath.join(eachWorkspace, '*package.json'))
    const updateDependencies = (dependencies, title) => {
        let updated = false
        for (const dependencyName in dependencies) {
            if (dependencyName in packagesOfName) {
                const dependencyVersion = dependencies[dependencyName]
                if (dependencyVersion === '') {
                    dependencies[dependencyName] = nextVersion
                    updated = true
                }
            }
        }
        return updated
    }

    // Read package.json by workspaces
    for (const eachPackagePath of fg.sync(workspacePackagePaths)) {
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
        dependencies && updateDependencies(dependencies, 'dependencies')
        peerDependencies && updateDependencies(peerDependencies, 'peerDependencies')
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
                        workspacePackage[key][paint('**' + dependencyName + '**')] =
                            eachDependencyVersion === nextVersion ? null : nextVersion
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
    log.success`bump version to +${nextVersion}+ for ${Object.keys(packagesOfName).length} packages in all workspace`
}