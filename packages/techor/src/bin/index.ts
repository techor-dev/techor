#!/usr/bin/env node

import { program } from 'commander'
import '../commands'
import { readFileAsJSON } from '@techor/fs'
const { version, name, description } = readFileAsJSON('./package.json')

program.name(name)
program.description(description)
program.version(version)
program.parse()
