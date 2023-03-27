const core = require('@actions/core')
const checkPRTitle = require('./check-pr-title')
const syncDevBranches = require('./sync-dev-branches')

switch (core.getInput('action')) {
    case 'check-pull-request-title':
        checkPRTitle()
            .catch(console.error)
        break
    case 'sync-dev-branches':
        syncDevBranches()
            .catch(console.error)
        break
}