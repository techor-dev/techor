/* eslint-disable no-irregular-whitespace */
import { execSync } from 'child_process'
import dedent from 'ts-dedent'
import stripAnsi from 'strip-ansi'

test('bump to specific version by analyzing dependencies', () => {
    const outputLog = execSync('NODE_OPTIONS=--experimental-vm-modules npx tsx ../src/bin version 1.2.0 --private --list',
        { cwd: __dirname, stdio: 'pipe' })
        .toString()
    expect(stripAnsi(outputLog)).toContain(dedent`
        📦
        ├─ @techor.tests/a
        │  └─ dependencies
        │     └─ @techor.tests/b
        ├─ @techor.tests/b
        └─ @techor.tests/c
           └─ peerDependencies
              └─ @techor.tests/a
        ⏺ Success bump version to ^1.2.0 for 3 packages in all workspace
    `)
})