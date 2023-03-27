import { execSync } from 'child_process';

export function expectErrorFreeCommand(command: string) {
    expect(() => execSync(command, { stdio: 'inherit' })).not.toThrowError()
}