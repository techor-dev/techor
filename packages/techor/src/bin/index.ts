#!/usr/bin/env node

import { Command } from 'commander'
import { readJSONFileSync } from '@techor/fs'
import { dirname, resolve } from 'path'

const { version, name, description } = readJSONFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '../../package.json'))
const program = new Command()

program
    .name(name)
    .description(description)
    .version(version || '0.0.0')

import commandBuild from '../commands/build'
import commandVersion from '../commands/version'
import { fileURLToPath } from 'url'

commandBuild(program)
commandVersion(program)

program.parse()