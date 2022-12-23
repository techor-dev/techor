import chalk from 'chalk'

export function getText (event: string, message?: string) {
    let text = ''
    if (event) {
        text += chalk.dim('[') + chalk.cyan(event) + chalk.dim('…] ')
    }
    text += message
    return text.trim()
}