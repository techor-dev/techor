import exec from './exec'

export default function commit(msg) {
    const args = prepareMessageArgs(msg)
    args.unshift(
        '--allow-empty',
        '--no-gpg-sign',
        '--no-verify'
    )
    return exec(`git commit ${args.join(' ')}`)
}


function prepareMessageArgs(msg) {
    const args = []
    if (Array.isArray(msg)) {
        if (msg.length > 0) {
            for (const m of msg) {
                args.push('-m', fixMessage(m))
            }
        } else {
            args.push('-m', fixMessage())
        }
    } else {
        args.push('-m', fixMessage(msg))
    }
    return args
}

function fixMessage(msg?: string) {
    if (!msg || typeof msg !== 'string') {
        msg = 'Test commit'
    }
    // we need to escape backtick for bash but not for windows
    // probably this should be done in git-dummy-commit or shelljs
    if (process.platform !== 'win32') {
        msg = msg.replace(/`/g, '\\`')
    }
    return `"${msg}"`
}

