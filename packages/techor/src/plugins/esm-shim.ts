import type { Plugin } from 'rollup'
import { parse, Options as AcornOptions, Statement, ModuleDeclaration } from 'acorn'
import escodegen from 'escodegen'

const parseOptions: AcornOptions = { ecmaVersion: 'latest', sourceType: 'module' }

const urlImportDeclaration = parse('import __url_for_shim from "url";', parseOptions).body[0]
const pathImportDeclaration = parse('import __path_for_shim from "path";', parseOptions).body[0]
const moduleImportDeclaration = parse('import __mod_for_shim from "module";', parseOptions).body[0]

const filenameDeclaration = parse('const __filename = __url_for_shim.fileURLToPath(import.meta.url);', parseOptions).body[0]
const dirnameDeclaration = parse('const __dirname = __path_for_shim.dirname(__filename);', parseOptions).body[0]
const requireDeclaration = parse('const require = __mod_for_shim.createRequire(import.meta.url);', parseOptions).body[0]

export default function esmShim(): Plugin {
    return {
        name: 'techor-esm-shim',
        renderChunk: {
            order: 'pre',
            async handler(code, chunk, options) {
                if (options.format === 'es') {
                    const ast = this.parse(code)
                    if (ast.type === 'Program' && ast.body) {
                        const newDeclarations = new Set<Statement | ModuleDeclaration>()
                        const filteredBody = ast.body.filter(Boolean)
                        let dirnameDeclared = false
                        let filenameDeclared = false
                        let requireDeclared = false
                        // top-level declarations
                        for (const node of filteredBody) {
                            if (node.type === 'VariableDeclaration') {
                                const varName = node.declarations[0].id?.['name']
                                switch (varName) {
                                    case '__dirname':
                                        dirnameDeclared = true
                                        break
                                    case '__filename':
                                        filenameDeclared = true
                                        break
                                    case 'require':
                                        requireDeclared = true
                                        break
                                }
                            }
                        }
                        let dirnameUsed = false
                        let filenameUsed = false
                        let requireUsed = false
                        // walk the ESTree to find whether the variables `__dirname` `__filename` `require` are used
                        const walk = (node: any) => {
                            if (node.type === 'Identifier') {
                                const name = node.name
                                if (name === '__dirname') dirnameUsed = true
                                if (name === '__filename') filenameUsed = true
                                if (name === 'require') requireUsed = true
                            }
                            for (const key in node) {
                                if (node[key] && typeof node[key] === 'object') {
                                    walk(node[key])
                                }
                            }
                        }
                        for (const node of filteredBody) {
                            walk(node)
                        }
                        // import
                        if (!filenameDeclared && filenameUsed || !dirnameDeclared && dirnameUsed) newDeclarations.add(urlImportDeclaration)
                        if (!dirnameDeclared && dirnameUsed) newDeclarations.add(pathImportDeclaration)
                        if (!requireDeclared && requireUsed) newDeclarations.add(moduleImportDeclaration)
                        // variable
                        if (!filenameDeclared && filenameUsed || !dirnameDeclared && dirnameUsed) newDeclarations.add(filenameDeclaration)
                        if (!dirnameDeclared && dirnameUsed) newDeclarations.add(dirnameDeclaration)
                        if (!requireDeclared && requireUsed) newDeclarations.add(requireDeclaration)
                        if (newDeclarations.size > 0) {
                            // extract shebang if exists
                            const shebang = code.match(/^#!(.*)/)?.[0] || ''
                            ast.body.unshift(...Array.from(newDeclarations) as any)
                            const generated: any = escodegen.generate(ast, { sourceMapWithCode: true, directive: true })
                            return {
                                code: (shebang ? shebang + '\n' : '') + generated.code,
                                map: generated.map
                            }
                        }
                    }
                }
                return null
            },
        }
    } as Plugin
}