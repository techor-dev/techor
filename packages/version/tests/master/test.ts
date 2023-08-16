/* eslint-disable no-irregular-whitespace */
import { execSync } from 'child_process'

it('bump to specific version for all workspaces', () => {
    execSync('tsx ../../../techor/src/bin version 2.0.0-beta.200', { cwd: __dirname, stdio: 'pipe' })
})