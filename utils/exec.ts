import { execSync } from 'child_process'

export default function exec(command) {
    return execSync(command, {
        stdio: 'pipe',
        encoding: 'utf-8'
    })
}