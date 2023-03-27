import { program } from 'commander'
import fg from 'fast-glob'
import fs from 'fs-extra'
import path from 'path'
import log, { paint } from '@techor/log'
import { readPackage } from '../utils/read-package'

const pkg = readPackage()

const defaults = {
    workspaces: pkg.workspaces
}

program.command('version <version>')
    .description('Bump to specific version for workspace\'s packages')
    .option('-p, --prefix <symbol>', 'Version prefix `^`, `~`, `>`, `>=`, `<`, `<=` ', '^')
    .option('-w, --workspaces <paths>', 'Specific your workspaces', defaults.workspaces)
    .option('-ls, --list', 'List current bumpable dependency tree in workspaces', false)
    .action((version, { prefix, list, workspaces }) => {
        const nextVersion = prefix + version
        const packagesOfPath = {}
        const packagesOfName = {}
        const workspacePackagePaths = workspaces.map((eachWorkspace) => path.join(eachWorkspace, '*package.json'))
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
            const eachPackage = fs.readJSONSync(eachPackagePath)
            // Prevent version bumps of private package
            if (!eachPackage.private) {
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
            if (!list) {
                fs.writeJSONSync(eachPackagePath, eachPackage)
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
    })

