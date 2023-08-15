const github = require('@actions/github')

module.exports = async function merge(targetBranch) {
    const client = new github.getOctokit(process.env.GITHUB_TOKEN)
    const headToMerge = process.env.GITHUB_SHA
    const repository = process.env.GITHUB_REPOSITORY
    const [owner = null, repo = null] = repository.split('/')

    await client.request('POST /repos/{owner}/{repo}/merges', {
        owner,
        repo,
        base: targetBranch,
        head: headToMerge,
        commit_message: `Merge ${headToMerge}`
    })
}
