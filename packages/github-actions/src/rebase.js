const github = require('@actions/github')

module.exports = async function rebase(targetBranch) {
    const client = new github.getOctokit(process.env.GITHUB_TOKEN)
    const headToMerge = process.env.GITHUB_SHA
    const repository = process.env.GITHUB_REPOSITORY
    const [owner = null, repo = null] = repository.split('/')

    await client.rest.git.updateRef({
        owner: owner,
        repo: repo,
        ref: `heads/${targetBranch}`,
        sha: headToMerge,
    })
}
