import fs from 'fs'
import path from 'path'
import dedent from 'dedent'
import exec from '../../../utils/exec'
import commit from '../../../utils/commit'
import initFakeGit from '../../../utils/init-fake-git'

const config = require('../')
const conventionalChangelogCore = require('conventional-changelog-core')

if (process.platform === 'win32') {
    test.todo('Skip conventional-changelog-config tests on Windows OS')
} else {
    if (!fs.existsSync(path.join(__dirname, '../changelog-dist'))) {
        fs.mkdirSync(path.join(__dirname, '../changelog-dist'))
    }
    describe('techor preset', () => {
        initFakeGit()
        test('changelog', async () => {
            await testAronChangelog(
                [
                    'Build: First build setup',
                    'CI(Travis): Add TravisCI pipeline',
                    'New: Amazing new module',
                    'Fix(Compiler): Avoid a bug',
                    'Fix: Content not changed',
                    'Fix(Vite): HMR causes page reloaded',
                    'Breaking(API): Rename `extend` parameters',
                    'Fix(Normal.css): Layout shift',
                    'Breaking: Remove `configure()` method',
                    'Perf(`ngOptions`): Make it faster, #1, #2',
                    'Drop(Syntax): Use `fg:color` instead of ~~`font:color`~~',
                    'Update(Contact): Address and tel',
                    'Drop(Commitlint Config): Remove `header-max-length` rule',
                    'Improve(UI): Call to action',
                    ['Perf(`ngOptions`): Make it faster', ' #1, #2'],
                    'Docs: Add `font-size` demo',
                    'Revert(`ngOptions`): Bad commit',
                    'Revert \\"Fix(Repo): PeerDependencies -> Dependencies\\"\n\nThis reverts commit 123.\n',
                    'Chore: Move directory',
                    'Misc: Delete unused file',
                    'Upgrade: Bump `@dummy/package` from 7.1.2 to 8.0.0',
                    'Fix(*): Oops!',
                    'Feat(Awesome): Addresses the issue brought up in #133',
                    'Feat(API): New option for test #88',
                    'Feat(Search): Issue brought up by @1aron! on Friday',
                    'Revert \\"Fix: Content not changed\\"',
                    'new: lowercase type',
                    'New: lowercase summary',
                    'New starts with `New` and sentense case'
                ],
                (changelog) => {
                    expect(changelog).toMatch('Amazing new module')
                    expect(changelog).toMatch('**Compiler** - Avoid a bug')
                    expect(changelog).toMatch('Make it faster')
                    expect(changelog).toMatch(', [#1](https://github.com/conventional-changelog/conventional-changelog/issues/1) [#2](https://github.com/conventional-changelog/conventional-changelog/issues/2)')
                    expect(changelog).toMatch('New Features')
                    expect(changelog).toMatch('Bug Fixes')
                    expect(changelog).toMatch('Performance Upgrades')
                    expect(changelog).toMatch('**`ngOptions`** - Bad commit')
                    expect(changelog).not.toMatch('Delete unused file')
                    expect(changelog).not.toMatch('First build setup')
                    expect(changelog).not.toMatch('**travis** - Add TravisCI pipeline')
                    expect(changelog).not.toMatch('**travis** - Continuously integrated.')
                    expect(changelog).not.toMatch('CI')
                    expect(changelog).not.toMatch('Build')
                    expect(changelog).not.toMatch('Chore')
                    expect(changelog).not.toMatch('*** - **')
                    expect(changelog).not.toMatch(': Not backward compatible.')
                    // should replace #[0-9]+ with GitHub issue URL
                    expect(changelog).toMatch('[#133](https://github.com/conventional-changelog/conventional-changelog/issues/133)')
                    // should remove the issues that already appear in the subject
                    expect(changelog).toMatch('[#88](https://github.com/conventional-changelog/conventional-changelog/issues/88)')
                    // should replace @username with GitHub user URL
                    expect(changelog).toMatch('[@1aron](https://github.com/1aron)')

                }, { changelogFileName: 'CHANGELOG.md' })
        })

        test('should work if there is a semver tag', async () => {
            exec('git tag v1.0.0')
            await testAronChangelog(
                ['Feat: `it` alias for `test`'],
                (changelog) => {
                    expect(changelog).toMatch('`it` alias for `test`')
                    // not to include provious changes
                    expect(changelog).not.toMatch('Breaking Changes')
                }, { changelogFileName: 'CHANGELOG.more.md' })
        })
    })
}

export function testAronChangelog(commits, handle: (changelog: string) => void, { changelogFileName, pkg }: any) {
    return new Promise<void>((resolve) => {
        commits.forEach((eachCommit) => commit(eachCommit))
        conventionalChangelogCore({
            config,
            pkg
        })
            .on('data', changelogChunk => {
                const changelog = changelogChunk.toString()
                fs.writeFileSync(path.join(__dirname, '../changelog-dist', changelogFileName), dedent(changelog))
                handle(changelog)
            })
            .on('error', (error) => {
                console.log(error)
                resolve()
            })
            .on('close', () => resolve())
    })
}