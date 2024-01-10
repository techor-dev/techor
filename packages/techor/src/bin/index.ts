#!/usr/bin/env node

import { Command } from 'commander'
import { readJSONFileSync } from '@techor/fs'
import log from '@techor/log'
import path from 'path'

const { version, name, description } = readJSONFileSync(path.resolve(__dirname, '../../package.json'))
const program = new Command()

program
    .name(name)
    .description(description)
    .version(version || '0.0.0')

program.command('pack [entryPaths...]')
    .option('-f, --format [formats...]', 'The output format for the generated JavaScript files `iife`, `cjs`, `esm`', ['cjs', 'esm'])
    .option('-w, --watch', 'Rebuild whenever a file changes', false)
    .option('-s, --sourcemap', 'Emit a source map', process.env.NODE_ENV === 'production')
    .option('-p, --platform <node,browser,neutral>', 'Platform target', 'browser')
    .option('-o, --outfile <name>', 'The output file', '')
    .option('-o, --outdir <dir>', 'The output directory for the build operation', 'dist')
    .option('--serve', 'Serve mode starts a web server that serves your code to your browser on your device', false)
    .option('--bundle', 'Inline any imported dependencies into the file itself', false)
    .option('-e, --external <packages...>', 'External packages to exclude from the build', [])
    .option('-re, --resolve-extensions [extensions...]', 'The resolution algorithm used by node supports implicit file extensions', ['.tsx', '.ts', '.jsx', '.js', '.css', '.json'])
    .option('-kn, --keep-names', 'Keep JavaScript function/class names', false)
    .option('--cjs-ext <ext>', 'Specify CommonJS default file extension', '.js')
    .option('--iife-ext <ext>', 'Specify CommonJS default file extension', '.js')
    .option('--esm-ext <ext>', 'Specify CommonJS default file extension', '.mjs')
    .option('--srcdir <dir>', 'The source directory', 'src')
    .option('--target [targets...]', 'This sets the target environment for the generated JavaScript and/or CSS code.')
    .option('--mangle-props <regExp>', 'Pass a regular expression to esbuild to tell esbuild to automatically rename all properties that match this regular expression')
    .option('--entry-names <[dir]/[name]>', 'Pass a regular expression to esbuild to tell esbuild to automatically rename all properties that match this regular expression')
    .option('--declare', 'Emit typescript declarations')
    .option('--no-minify', 'OFF: Minify the generated code')
    .option('--no-clean', 'OFF: Clean up the previous output directory before the build starts')
    .option('--no-external', 'OFF: No external packages')
    .action(async function (args, options) {
        try {
            const action = require(
                process.env.NODE_ENV === 'test'
                    ? '../../../pack/src/actions/main'
                    : '@techor/pack/actions/main'
            )
            await action(args, options)
        } catch (error) {
            if (error.code === 'ERR_MODULE_NOT_FOUND') {
                log.i`Please run **npm** **install** **@techor/pack** first`
            } else {
                console.error(error)
            }
        }
    })

program.command('version <version>')
    .description('Bump to specific version for workspace\'s packages')
    .option('-p, --prefix <symbol>', 'Version prefix `^`, `~`, `>`, `>=`, `<`, `<=` ', '^')
    .option('-w, --workspaces <paths>', 'Specific your workspaces')
    .option('-ls, --list', 'List current bumpable dependency tree in workspaces', false)
    .action(async function (args, options) {
        try {
            const action = require(
                process.env.NODE_ENV === 'test'
                    ? '../../../version/src/actions/main'
                    : '@techor/version/actions/main'
            )
            await action(args, options)
        } catch (error) {
            if (error.code === 'ERR_MODULE_NOT_FOUND') {
                log.i`Please run **npm** **install** **@techor/version** first`
            } else {
                console.error(error)
            }
        }
    })

program.parse()