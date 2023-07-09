import { expectErrorCommand } from '../../../utils/expect-error-command'
import { expectErrorFreeCommand } from '../../../utils/expect-error-free-command'

if (process.platform === 'win32') {
    test.todo('Skip commitlint-config tests on Windows OS')
} else {
    test('Type: Summary', () => {
        expectErrorFreeCommand(`echo 'New: Syntax' | commitlint`)
    })

    test('Type(Scope): Summary', () => {
        expectErrorFreeCommand(`echo 'New(CSS): Syntax' | commitlint`)
    })

    test('Sentense case', () => {
        expectErrorFreeCommand(`echo 'Update something' | commitlint`)
        expectErrorFreeCommand(`echo 'Update README.md' | commitlint`)
    })
    test('non-sentense case header', () => {
        expectErrorCommand(`echo 'update something' | commitlint`)
    })

    test('type(scope): summary', () => {
        expectErrorCommand(`echo 'new(css): syntax' | commitlint`)
    })

    test('Type(scope): Summary', () => {
        expectErrorCommand(`echo 'Update(scope): Summary' | commitlint`)
    })

    test('type: summary', () => {
        expectErrorCommand(`echo 'fix: syntax' | commitlint`)
    })

    test('non-existing types', () => {
        expectErrorCommand(`echo 'Omg: What is this?' | commitlint`)
        expectErrorCommand(`echo 'Omg(Really?): What is this?' | commitlint`)
    })

}
