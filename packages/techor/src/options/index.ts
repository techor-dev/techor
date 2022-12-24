const options: Options<any> = {
    cwd: process.cwd()
}

export default options

export interface Options<Config> {
    config?: string | Config
    cwd?: string
}