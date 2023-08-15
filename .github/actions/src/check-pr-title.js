const core = require('@actions/core')
const github = require('@actions/github')
const validateTitle = require('./validate-title')

module.exports = async function checkPRTitle() {
    try {
        const contextName = core.getInput('pr-title-check-name')
        const successState = core.getInput('pr-title-check-valid-message')
        const failureState = core.getInput('pr-title-check-invalid-message')
        const targetUrl = core.getInput('pr-title-check-detail-url')

        const client = new github.getOctokit(process.env.GITHUB_TOKEN)

        const contextPullRequest = github.context.payload.pull_request
        if (!contextPullRequest) {
            throw new Error(
                'This action can only be invoked in `pull_request` events. Otherwise the pull request can\'t be inferred.'
            )
        }

        const owner = contextPullRequest.base.user.login
        const repo = contextPullRequest.base.repo.name

        let error = null
        try {
            await validateTitle(contextPullRequest.title)
        } catch (err) {
            error = err
        }

        core.setOutput('success', (error === null).toString())

        let state = 'success'
        let description = successState
        if (error) {
            state = 'failure'
            description = failureState
        }

        await client.request(
            'POST /repos/:owner/:repo/statuses/:sha',
            {
                owner,
                repo,
                state,
                description,
                sha: contextPullRequest.head.sha,
                target_url: targetUrl,
                context: contextName,
            },
        )

        if (error) {
            throw error
        } else {
            console.log(`${state}: ${description}`)
        }
    } catch (error) {
        core.setOutput('error', error.message)
        core.setFailed(error.message)
    }
}
