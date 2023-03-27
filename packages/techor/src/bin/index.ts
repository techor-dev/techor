#!/usr/bin/env node

import { program } from 'commander'
import path from 'path'
import '../commands'
import { readPackage } from '../utils/read-package'

const { version, name, description } = readPackage(path.join(__dirname, '../../package.json'))
program
    .name(name)
    .description(description)
    .version(version)

program.parse()

