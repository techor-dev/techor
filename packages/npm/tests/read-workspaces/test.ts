import { readWorkspaces } from '../../src'

it('read pnpm workspaces', () => {
    expect(readWorkspaces({ cwd: __dirname }))
        .toEqual(['packages/*'])
})