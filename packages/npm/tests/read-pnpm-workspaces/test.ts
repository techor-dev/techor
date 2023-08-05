import { readPNPMWorkspaces } from '../../src'

it('read pnpm workspaces', () => {
    expect(readPNPMWorkspaces({ cwd: __dirname }))
        .toEqual(['packages/*'])
})