const github = require('@actions/github')

module.exports = async function checkBranchExists(branchName) {
    try {
        const client = new github.getOctokit(process.env.GITHUB_TOKEN)
        const repository = process.env.GITHUB_REPOSITORY
        const [owner = null, repo = null] = repository.split('/')
        await client.request('GET /repos/{owner}/{repo}/branches/{branch}', {
            owner,
            repo,
            branch: branchName
        })
        return true
    } catch (e) {
        if (e.message === 'Branch not found') {
            return false
        }
        throw new Error(`Failed to get branch: ${e.message}`)
    }
}
