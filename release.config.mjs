import { configure } from 'semantic-release-config-techor'

export default configure({
    plugins: {
        '@semantic-release/exec': {
            verifyReleaseCmd: 'pnpm run version ${nextRelease.version}'
        }
    }
})
