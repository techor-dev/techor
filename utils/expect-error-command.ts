import { execSync } from 'child_process';

export function expectErrorCommand(command: string) {
    expect(() => execSync(command, { stdio: 'inherit' })).toThrowError()
}