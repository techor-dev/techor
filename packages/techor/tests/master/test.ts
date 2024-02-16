import path from 'path'
import { copy, rm } from '../../../../utils/fs'
import { explorePathsSync } from '../../../glob/src'
import { readFileSync } from '../../../fs/src'
import { readWorkspaces } from '../../../npm/src'
import { execSync } from 'child_process'

const tmpDir = path.join(__dirname, 'tmp')

beforeAll(() => {
    rm(tmpDir)
    copy(path.join(__dirname, 'sources'), tmpDir)
})

it('bump to specific version for all workspaces', () => {
    process.chdir(tmpDir)
    execSync('tsx ../../../src/bin version 2.0.0-beta.200', { cwd: tmpDir, stdio: 'inherit' })
    const workspacePackagePaths = readWorkspaces().map((eachWorkspace) => path.join(eachWorkspace, '*package.json'))
    for (const eachPackagePath of explorePathsSync(workspacePackagePaths)) {
        const eachPackageRaw = readFileSync(path.resolve(eachPackagePath), { encoding: 'utf8' })
        expect(eachPackageRaw).toContain('"version":"2.0.0-beta.200"')
        expect(eachPackageRaw).not.toContain('workspace:')
    }
})
