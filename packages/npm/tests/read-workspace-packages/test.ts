import { readWorkspacePackages } from '../../src'

it('read workspace packages', () => {
    expect(readWorkspacePackages(['packages/**'], { cwd: __dirname }))
        .toEqual([
            { name: '@read-workspace-packages.tests/a', private: true },
            { name: '@read-workspace-packages.tests/b', private: true },
            { name: '@read-workspace-packages.tests/d', private: true },
            { name: '@read-workspace-packages.tests/bb', private: true }
        ])
})

it('read workspace packages by cwd package.json', () => {
    expect(readWorkspacePackages(undefined, { cwd: __dirname }))
        .toEqual([
            { name: '@read-workspace-packages.tests/a', private: true },
            { name: '@read-workspace-packages.tests/b', private: true },
            { name: '@read-workspace-packages.tests/d', private: true },
            { name: '@read-workspace-packages.tests/bb', private: true }
        ])
})

it('filter public workspace packages', () => {
    expect(
        readWorkspacePackages(undefined, { cwd: __dirname })
            .filter((eachWorkspacePackage) => !eachWorkspacePackage.private)
    )
        .toEqual([])
})