/* eslint-disable no-irregular-whitespace */
import { execSync } from 'child_process'
import dedent from 'ts-dedent'
import stripAnsi from 'strip-ansi'

it('bump to specific version by analyzing PNPM dependencies', () => {
    const outputLog = execSync('tsx ../../src/bin version 1.2.0 --list',
        { cwd: __dirname, stdio: 'pipe' })
        .toString()
    expect(stripAnsi(outputLog)).toContain(dedent`
        𝓲 pnpm-workspace.yaml is detected
        📦
        ├ @test/pnpm-a
        │  └ dependencies
        │     └ @test/pnpm-b: ^1.2.0
        ├ @test/pnpm-b
        └ @test/pnpm-c
           └ peerDependencies
              └ @test/pnpm-a: ~1.2.0
        ⏺ Success bump version to 1.2.0 for 3 packages in all workspace
    `)
})