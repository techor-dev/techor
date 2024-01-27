import fs, { writeFile, writeFileSync } from 'fs'
import path, { resolve } from 'path'
import exec from '../../../utils/exec'
import commit from '../../../utils/commit'
import initFakeGit from '../../../utils/init-fake-git'
import dotenv from 'dotenv'

const createPreset = require('../dist')
const conventionalChangelogCore = require('conventional-changelog-core')

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

if (!fs.existsSync(path.join(__dirname, './dist'))) {
    fs.mkdirSync(path.join(__dirname, './dist'))
}

if (process.platform === 'win32') {
    test.todo('Skip conventional-changelog-config tests on Windows OS')
} else {
    initFakeGit()
    describe('techor preset', () => {
        test('changelog', async () => {
            [
                'Fix(CSS): `@media` and `@supports` doesn\'t transform `|` to ` ` #198',
                'Build : First build setup',
                'CI(Travis): Add TravisCI pipeline',
                'New: Amazing new module',
                'Fix(Compiler): Avoid a bug',
                'Fix: Content not changed',
                'Fix(Vite): HMR causes page reloaded',
                'Breaking(API): Rename `extend` parameters',
                'Fix(Normal.css): Layout shift',
                'Breaking: Remove `configure()` method',
                'Perf(`ngOptions`): Make it faster #1 #2',
                'Drop(Syntax): Use `fg:color` instead of ~~`font:color`~~',
                'Update(Contact): Address and tel',
                'Drop(Commitlint Config): Remove `header-max-length` rule',
                'Improve(UI): Call to action',
                ['Perf(`ngOptions`): Make it faster', ' #1 #2'],
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
            ].forEach((message) => commit(message))
            for await (let chunk of conventionalChangelogCore({
                config: await createPreset(),
                cwd: process.cwd()
            })) {
                chunk = chunk.toString()
                writeFileSync(resolve(__dirname, './dist/CHANGELOG-1.md'), chunk)
                expect(chunk).toMatch('Amazing new module')
                expect(chunk).toMatch('Compiler')
                expect(chunk).toMatch('Avoid a bug')
                expect(chunk).toMatch('Make it faster')
                expect(chunk).toMatch('[#1](https://github.com/conventional-changelog/conventional-changelog/issues/1) [#2](https://github.com/conventional-changelog/conventional-changelog/issues/2)')
                expect(chunk).toMatch('New Features')
                expect(chunk).toMatch('Bug Fixes')
                expect(chunk).toMatch('Performance Upgrades')
                expect(chunk).toMatch('`ngOptions`')
                expect(chunk).toMatch('Bad commit')
                expect(chunk).not.toMatch('Delete unused file')
                expect(chunk).not.toMatch('First build setup')
                expect(chunk).not.toMatch('Add TravisCI pipeline')
                expect(chunk).not.toMatch('Continuously integrated.')
                expect(chunk).not.toMatch('CI')
                expect(chunk).not.toMatch('Build')
                expect(chunk).not.toMatch('Chore')
                expect(chunk).not.toMatch('*** - **')
                expect(chunk).not.toMatch(': Not backward compatible.')
                // should replace #[0-9]+ with GitHub issue URL
                expect(chunk).toMatch('[#133](https://github.com/conventional-changelog/conventional-changelog/issues/133)')
                // should remove the issues that already appear in the subject
                expect(chunk).toMatch('[#88](https://github.com/conventional-changelog/conventional-changelog/issues/88)')
                // should replace @username with GitHub user URL
                expect(chunk).toMatch('[@1aron](https://github.com/1aron)')
            }
        }, 10000)

        test('should work if there is a semver tag', async () => {
            exec('git tag v1.0.0')
            commit('Feat: `it` alias for `test`')
            for await (let chunk of conventionalChangelogCore({
                cwd: process.cwd()
            })) {
                chunk = chunk.toString()
                writeFileSync(resolve(__dirname, './dist/CHANGELOG-2.md'), chunk)
                expect(chunk).toMatch('`it` alias for `test`')
                // not to include provious changes
                expect(chunk).not.toMatch('Breaking Changes')
            }
        }, 10000)
    })
}