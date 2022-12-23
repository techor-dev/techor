import chalk from 'chalk'

export function paint(message: string) {
    return message // 取代純數字
        .split(' ')
        .map((eachSplit) => eachSplit
            .replace(/^(\d*\.?\d*)$/g, `${chalk.blue('$1')}`)
            // 取代值與單位
            .replace(/^(\d*\.?\d*)(YB|ZB|EB|PB|TB|GB|MB|KB|B|mb|kb|bit|zs|as|fs|ps|ns|µs|ms|s|m|h|d|m|y)$/g, `${chalk.cyan('$1')}${chalk.magenta('$2')}`)
            // timestamp
            .replace(/^((?:[0-1]?[0-9]|[2][0-3]):[0-5][0-9]:[0-5][0-9] (?:AM|PM)?)$/g, `${chalk.dim('$1')}`)
            // [pink]
            .replace(/^\[(.*?)\]$/g, `${chalk.dim('[')}${chalk.magenta('$1')}${chalk.dim(']')}`)
            // [normal]
            .replace(/^`(.*?)`$/g, `${chalk.dim('`')}$1${chalk.dim('`')}`)
            // (normal)
            .replace(/^\((.*?)\)$/g, `${chalk.dim('(')}$1${chalk.dim(')')}`)
            // <gray>
            .replace(/^<(.*?)>$/g, `${chalk.dim('<')}${chalk.gray('$1')}${chalk.dim('>')}`)
            // prettier arrows
            .replace(/->/g, chalk.dim('→'))
            .replace(/<-/g, chalk.dim('←'))
            // replace $t
            .replace(/^\$t$/g, `${chalk.dim(new Date().toLocaleTimeString())}`)
            // highlight
            .replace(/^\*\*(.*?)\*\*$/g, `${chalk.bold.white('$1')}`)
            // strikethrough
            .replace(/^~~(.*?)~~$/g, `${chalk.strikethrough('$1')}`)
            // underline
            .replace(/^__(.*?)__$/g, `${chalk.underline('$1')}`)
            // silence
            .replace(/^\.\.(.*?)\.\.$/g, `${chalk.dim('$1')}`)
            // warn
            .replace(/^!!(.*?)!!$/g, `${chalk.yellow('$1')}`)
            // italic
            .replace(/^\*(.*?)\*$/g, `${chalk.italic('$1')}`)
            .replace(/^_(.*?)_$/g, `${chalk.italic('$1')}`)
            // +
            .replace(/^\+(.*?)\+$/g, `${chalk.green('$1')}`)
            // -
            .replace(/^-(.*?)-$/g, `${chalk.red('$1')}`)
        )
        .join(' ')
}