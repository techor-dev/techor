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
import commandVersion from '../commands/version'

commandPack(program)
commandVersion(program)

program.parse()