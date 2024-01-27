module.exports = async () => ({
    conventionalChangelog: require('./changelog'),
    parserOpts: require('./parser-opts'),
    recommendedBumpOpts: require('./recommended-bump'),
    writerOpts: require('./writer-opts')
})