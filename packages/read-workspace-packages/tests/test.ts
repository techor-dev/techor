import readWorkspacePackages from '../src'

it('read workspace packages', () => {
    expect(readWorkspacePackages(['packages/**'], { cwd: __dirname }))
        .toEqual([{ name: 'a' }, { name: 'b' }, { name: 'd', private: true }, { name: 'bb' }])
})

it('read workspace packages by cwd package.json', () => {
    expect(readWorkspacePackages(undefined, { cwd: __dirname }))
        .toEqual([{ name: 'a' }, { name: 'b' }, { name: 'd', private: true }, { name: 'bb' }])
})

it('filter public workspace packages', () => {
    expect(
        readWorkspacePackages(undefined, { cwd: __dirname })
            .filter((eachWorkspacePackage) => !eachWorkspacePackage.private)
    )
        .toEqual([{ name: 'a' }, { name: 'b' }, { name: 'bb' }])
})