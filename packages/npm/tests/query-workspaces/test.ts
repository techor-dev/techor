import { queryWorkspaces } from '../../src'
import { writeJSONFileSync } from '../../../fs/src'
import path from 'path'

it('query workspaces', () => {
    expect(queryWorkspaces(['packages/**'], { cwd: __dirname }))
        .toEqual(['packages/a', 'packages/b', 'packages/b/bb'])
})

it('query workspaces by cwd package.json', () => {
    expect(queryWorkspaces(undefined, { cwd: __dirname }))
        .toEqual(['packages/a', 'packages/b', 'packages/b/bb'])
})

it('query for non-existing workspaces', () => {
    expect(queryWorkspaces(undefined, { cwd: path.join(__dirname, 'packages') }))
        .toEqual([])
})

it('exclude workspaces without package.json', () => {
    expect(queryWorkspaces(undefined, { cwd: __dirname }))
        .not.toContain('packages/c')
})

it('exclude node_modules', () => {
    // create fake node_modules
    writeJSONFileSync(
        path.resolve(__dirname, 'packages/b/node_modules/fake-module/package.json'),
        { name: 'fake-module' }
    )
    expect(queryWorkspaces(undefined, { cwd: __dirname }))
        .not.toContain('packages/b/node_modules/fake-module')
})