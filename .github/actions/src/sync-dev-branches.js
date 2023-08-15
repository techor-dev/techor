const core = require('@actions/core')
const checkBranchExists = require('./check-branch-exist')
const rebase = require('./rebase')
const merge = require('./merge')

module.exports = async function syncDevBranches() {
    const currentBranchName = process.env.GITHUB_REF_NAME
    const targetBranchName = `dev/${currentBranchName}`
    if (await checkBranchExists(targetBranchName)) {
        try {
            await rebase(targetBranchName)
        } catch (error) {
            console.error('Rebase failed, trying merge')
            console.error(error)
            try {
                await merge(targetBranchName)
            } catch (error) {
                core.setOutput('error', error.message)
                core.setFailed(error.message)
            }
        }
    }
}
