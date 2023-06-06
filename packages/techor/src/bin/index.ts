#!/usr/bin/env node

import { program } from 'commander'
import { readFileAsJSON } from '@techor/fs'
const { version, name, description } = readFileAsJSON('./package.json')

program.command('pack', 'Alias for techor-pack')
program.command('version', 'Alias for techor-version')
program.parse(process.argv)
program.name(name)
program.description(description)
program.version(version)