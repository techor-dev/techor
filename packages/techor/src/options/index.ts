const defaultOptions = {
    cwd: process.cwd()
}

export default defaultOptions

export interface TechorOptions<Config> {
    config?: string | Config
    debug?: boolean
    cwd?: string
}