import type { Plugin } from 'esbuild'
import fs from 'fs'
import upath from 'upath'
import path from 'path'
import { changeExt } from 'upath'
import { explorePathSync } from '@techor/glob'

export function createAutofillMjsPlugin(outext = '.js', srcdir = 'src'): Plugin {
    const resolvedOutdir = path.resolve(srcdir)
    return {
        name: 'autofill-mjs',
        setup(build) {
            const started: any = {}
            started.promise = new Promise(resolve => {
                started.resolve = resolve
            })
            build.onStart(() => {
                started.resolve(true)
            })
            build.onLoad({ filter: /\.(?:ts|tsx|js|jsx|mjs|mts)$/ }, async (args) => {
                if (await started.promise === true) {
                    const content = await fs.promises.readFile(args.path, { encoding: 'utf8' })
                    const currentDirPath = path.dirname(args.path)
                    return {
                        contents: content
                            .replace(/((?:(?:import|export)(?:.*from | ))|(?:(?:import|require))\()'((\.(?:\.)?\/.*)|\.)'/gmi,
                                (...matches) => {
                                    const modulePath: string = matches[2]
                                    const parsedModulePath = path.parse(modulePath)
                                    if (parsedModulePath.ext) {
                                        return matches[0]
                                    }
                                    const targetDir = path.resolve(currentDirPath, modulePath)
                                    const foundModuleSourcePath = explorePathSync([
                                        targetDir + '.{ts,js,mjs,jsx,tsx,mjs,mts}',
                                        upath.join(targetDir, 'index.{ts,js,mjs,jsx,tsx,mjs,mts}')
                                    ])
                                    if (!foundModuleSourcePath) {
                                        return matches[0]
                                    }
                                    let targetModulePath = path.relative(resolvedOutdir, changeExt(foundModuleSourcePath, outext))
                                    const parsedTargetModulePath = path.parse(targetModulePath)
                                    if (modulePath === '.' || modulePath === './') {
                                        targetModulePath = './index' + outext
                                    } else if (parsedTargetModulePath.name === parsedModulePath.name) {
                                        targetModulePath = modulePath + outext
                                    } else {
                                        targetModulePath = modulePath + '/index' + outext
                                    }
                                    return `${matches[1]}'${targetModulePath}'`
                                }),
                        loader: 'tsx',
                    }
                }
            })
        }
    }
}