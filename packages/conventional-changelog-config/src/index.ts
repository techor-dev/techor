import conventionalChangelog from './changelog'
import parserOpts from './parser-opts'
import recommendedBumpOpts from './recommended-bump'
import writerOpts from './writer-opts'

export default async function createPreset() {
    return {
        conventionalChangelog,
        parserOpts,
        recommendedBumpOpts,
        writerOpts
    }
}