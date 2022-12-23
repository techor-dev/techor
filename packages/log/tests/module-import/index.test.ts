import { execSync } from 'child_process'

test('module import', async () => {
    try {
        execSync('node ./index.js', { cwd: __dirname, stdio: 'pipe' })
    } catch (err) {
        expect(err).toBeUndefined()
    }
})