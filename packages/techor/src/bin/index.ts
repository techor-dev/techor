#!/usr/bin/env node

import { program } from 'commander'
import { readJSONFileSync } from '@techor/fs'
import { execSync } from 'child_process'

const { version, name, description } = readJSONFileSync('./package.json')
const args = process.argv.slice(4)

program.command('pack', 'Alias for techor-pack').action(() => { execSync('techor-pack ' + args.join(' '), { stdio: 'inherit' }) })
program.command('version', 'Alias for techor-version').action(() => { execSync('techor-version ' + args.join(' '), { stdio: 'inherit' }) })
program.parse(process.argv)
program.name(name)
program.description(description)
program.version(version)