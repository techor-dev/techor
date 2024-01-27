import { analyzeCommits } from '@semantic-release/commit-analyzer'
import commitFalsely from '../../../utils/commit-falsely'
import releaseRules from '../rules'

const createLogSpy = () => jest.spyOn(console, 'log').mockImplementation(() => null)

test('Parse with "conventional-changelog-techor" by default', async () => {
    const logSpy = createLogSpy()
    const commits = commitFalsely(
        'Fix(Scope1): First fix',
        'Feat(Scope2): Second feature'
    )
    const releaseType = await analyzeCommits(
        { preset: 'techor', releaseRules },
        { cwd: process.cwd(), commits, logger: console }
    )
    expect(releaseType).toBe('minor')
    expect(logSpy).toHaveBeenCalledWith('Analyzing commit: %s', commits[0].message)
    expect(logSpy).toHaveBeenCalledWith('The release type for the commit is %s', 'patch')
    expect(logSpy).toHaveBeenCalledWith('Analyzing commit: %s', commits[1].message)
    expect(logSpy).toHaveBeenCalledWith('The release type for the commit is %s', 'minor')
    expect(logSpy).toHaveBeenCalledWith('Analysis of %s commits complete: %s release', 2, 'minor')
    logSpy.mockRestore()
})

test('Docs(README) -> +0.0.1 Patch', async () => {
    const logSpy = createLogSpy()
    const commits = commitFalsely('Docs(README): Something')
    const releaseType = await analyzeCommits(
        { preset: 'techor', releaseRules },
        { cwd: process.cwd(), commits, logger: console }
    )
    expect(releaseType).toBe('patch')
    logSpy.mockRestore()
})

test('Update README.md -> No version bump', async () => {
    const logSpy = createLogSpy()
    const commits = commitFalsely('Update README.md')
    const releaseType = await analyzeCommits(
        { preset: 'techor', releaseRules },
        { cwd: process.cwd(), commits, logger: console }
    )
    expect(releaseType).toBe(null)
    logSpy.mockRestore()
})

test('Bump(Major) -> +1.0.0 Major', async () => {
    const logSpy = createLogSpy()
    const commits = commitFalsely('Bump(Major): Master CSS `v2.0.0`')
    const releaseType = await analyzeCommits(
        { preset: 'techor', releaseRules },
        { cwd: process.cwd(), commits, logger: console }
    )
    expect(releaseType).toBe('major')
    logSpy.mockRestore()
})

test('Revert commit and +0.0.1', async () => {
    const logSpy = createLogSpy()
    const commits = commitFalsely('Revert "Fix(Repo): PeerDependencies -> Dependencies"\n\nThis reverts commit 779347237eef77e9137f88095e1fb813e5101c2b.\n')
    const releaseType = await analyzeCommits(
        { preset: 'techor', releaseRules },
        { cwd: process.cwd(), commits, logger: console }
    )
    expect(releaseType).toBe('patch')
    logSpy.mockRestore()
})

test('Exclude commits if they have a matching revert commits', async () => {
    const logSpy = createLogSpy()
    const commits = commitFalsely(
        'Fix(Scope): First fix',
        { message: 'Revert: Feat(Scope): First feature\n\nThis reverts commit 123.\n', hash: '456', },
        { message: 'Feat(Scope): First feature', hash: '123', }
    )
    const releaseType = await analyzeCommits(
        { preset: 'techor', releaseRules },
        { cwd: process.cwd(), commits, logger: console }
    )
    expect(releaseType).toBe('patch')
    expect(logSpy).toHaveBeenCalledWith('Analyzing commit: %s', commits[0].message)
    expect(logSpy).toHaveBeenCalledWith('The release type for the commit is %s', 'patch')
    expect(logSpy).toHaveBeenCalledWith('Analysis of %s commits complete: %s release', 3, 'patch')
    logSpy.mockRestore()
})

test('Return "patch" if there is only types set to "patch"', async () => {
    const logSpy = createLogSpy()
    const commits = commitFalsely(
        'Fix: Something #123',
        'Perf: Improvement'
    )
    const releaseType = await analyzeCommits(
        { preset: 'techor', releaseRules },
        { cwd: process.cwd(), commits, logger: console }
    )
    expect(releaseType).toBe('patch')
    expect(logSpy).toHaveBeenCalledWith('Analyzing commit: %s', commits[0].message)
    expect(logSpy).toHaveBeenCalledWith('The release type for the commit is %s', 'patch')
    expect(logSpy).toHaveBeenCalledWith('Analyzing commit: %s', commits[1].message)
    expect(logSpy).toHaveBeenCalledWith('The release type for the commit is %s', 'patch')
    expect(logSpy).toHaveBeenCalledWith('Analysis of %s commits complete: %s release', 2, 'patch')
    logSpy.mockRestore()
})

test('Return "null" if no rule match', async () => {
    const logSpy = createLogSpy()
    const commits = commitFalsely(
        'Docs: Change',
        'Chore: Misc',
        'Any'
    )
    const releaseType = await analyzeCommits(
        { preset: 'techor', releaseRules },
        { cwd: process.cwd(), commits, logger: console }
    )
    expect(releaseType).toBe(null)
    logSpy.mockRestore()
})