import tmp from 'tmp'
import fs from 'fs'
import exec from './exec'

export default function initFakeGit() {
    const tmpDir = tmp.dirSync()
    process.chdir(tmpDir.name)
    fs.mkdirSync('git-templates')
    exec('git init --template=./git-templates')
    exec('git config user.email "test@example.com"')
    exec('git config user.name "test"')
    fs.writeFileSync('./package.json', JSON.stringify({
        name: 'conventional-changelog-core',
        repository: {
            type: 'git',
            url: 'https://github.com/conventional-changelog/conventional-changelog.git'
        }
    }))
}