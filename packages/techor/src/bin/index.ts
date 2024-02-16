#!/usr/bin/env node

import { Command } from 'commander'
import { readJSONFileSync } from '@techor/fs'
import log from '@techor/log'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const { version, name, description } = readJSONFileSync(path.resolve(__dirname, '../../package.json'))
const program = new Command()

program
    .name(name)
    .description(description)
    .version(version || '0.0.0')

import commandPack from '../commands/pack'

commandPack(program)

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