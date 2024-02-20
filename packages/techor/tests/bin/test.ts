import { execSync } from 'node:child_process'
import { expectFileIncludes } from '../../../../utils/expect-file-includes'

beforeAll(() => {
    execSync('tsx ../../src/bin build', { cwd: __dirname })
})

test('bin', () => {
    expectFileIncludes('dist/bin/index.mjs', [`#!/usr/bin/env node`], { cwd: __dirname })
})

test('main', () => {
    expectFileIncludes('dist/index.mjs', [`export { main };`], { cwd: __dirname })
    expectFileIncludes('dist/index.cjs', [`exports.main = main;`], { cwd: __dirname })
})