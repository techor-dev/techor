
import path from 'path'
import { execSync } from 'child_process'
import { copy, rm } from '../../../../utils/fs'

const tmpDir = path.join(__dirname, 'tmp')

beforeAll(() => {
    rm(tmpDir)
    copy(path.join(__dirname, 'sources'), tmpDir)
})

it('bump to specific version for all workspaces', () => {
    execSync('tsx ../../../../techor/src/bin version 2.0.0-beta.200', { cwd: tmpDir, stdio: 'inherit' })
})
