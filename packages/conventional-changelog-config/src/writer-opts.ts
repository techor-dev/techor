import compareFunc from 'compare-func'
import { commits } from 'techor-conventional-commits'
import mainTemplatePath from './templates/template.hbs'
import footerPartialPath from './templates/footer.hbs'
import commitPartialPath from './templates/commit.hbs'
import { readFileSync } from 'fs'
import path from 'path'
import https from 'node:https'

const mainTemplate = readFileSync(path.resolve(__dirname, mainTemplatePath), 'utf-8')
const footerPartial = readFileSync(path.resolve(__dirname, footerPartialPath), 'utf-8')
const commitPartial = readFileSync(path.resolve(__dirname, commitPartialPath), 'utf-8')

module.exports = {
    transform: async (commit, context) => {
        const issues = []
        if (commit.header) {
            commit.header = commit.header
                .replace(/->/g, '→')
                .replace(/<-/g, '←')
        }
        const conventionalCommit = commits.find(({ type }) => commit.type === type)
        if (commit.type === 'Revert' || commit.revert) {
            commit.type = commits.find(({ type }) => type === 'Revert').group
            /**
             * From    Revert: "Feat(Scope): First feature"
             * To      Revert:《 Feat(Scope): First feature 》
             */
            commit.header = commit.header.replace(/(Revert|Revert:)\s"([\s\S]+?)"(.*)/, '$1 ``` $2 `text` ``` $3')
        } else if (conventionalCommit && !conventionalCommit.hidden && conventionalCommit.group) {
            commit.type = conventionalCommit.group
        } else {
            return
        }

        if (commit.scope === '*') {
            commit.scope = ''
        }

        if (typeof commit.hash === 'string') {
            commit.shortHash = commit.hash.substring(0, 7)
        }

        if (typeof commit.subject === 'string') {
            const url = context.repository
                ? `${context.host}/${context.owner}/${context.repository}`
                : context.repoUrl
            if (url) {
                // Issue URLs.
                const issuesUrl = `${url}/issues/`

                commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
                    issues.push(issue)

                    return `[#${issue}](${issuesUrl}${issue})`
                })

                if (context.host) {
                    // User URLs.
                    commit.subject = commit.subject.replace(/(?<!['`])@([a-z0-9](?:-?[a-z0-9]){0,38})(?<!['])/gi, (_, username) => {
                        if (username.includes('/')) {
                            return `@${username}`
                        }

                        return `[@${username}](${context.host}/${username})`
                    })
                }

                if (process.env.NODE_ENV !== 'test') {
                    // get issuer by #issue
                    for (const eachIssue of issues) {
                        try {
                            const response = await new Promise<string>((resolve) => {
                                const url = `https://api.github.com/repos/${context.owner}/${context.repository}/issues/${eachIssue}`
                                const headers = {
                                    'User-Agent': context.owner
                                }
                                if (process.env.GITHUB_TOKEN) {
                                    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
                                }
                                https.get(url, { headers },
                                    response => {
                                        let data = ''
                                        response.on('data', (chunk) => data += chunk)
                                        response.on('end', async () => {
                                            resolve(data)
                                        })
                                    }
                                )
                            })
                            const user = JSON.parse(response).user
                            if (user) {
                                commit.subject += ` [@${user.login}](${user.html_url})`
                            }
                        } catch (error) {
                            console.log(new Error(`Can't get issuer by #${eachIssue}`, { cause: error }))
                        }
                    }

                    // get author by commit hash
                    try {
                        const response = await new Promise<string>((resolve) => {
                            const url = `https://api.github.com/repos/${context.owner}/${context.repository}/commits/${commit.hash}`
                            const headers = {
                                'User-Agent': context.owner
                            }
                            if (process.env.GITHUB_TOKEN) {
                                headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
                            }
                            https.get(url, { headers },
                                response => {
                                    let data = ''
                                    response.on('data', (chunk) => data += chunk)
                                    response.on('end', async () => {
                                        resolve(data)
                                    })
                                }
                            )
                        })
                        const author = JSON.parse(response).author
                        if (author) {
                            commit.subject += ` [@${author.login}](${author.html_url})`
                        }
                    } catch (error) {
                        console.log(new Error(`Can't get author by commit hash ${commit.hash}`, { cause: error }))
                    }
                }
            }
        }

        // remove references that already appear in the subject
        commit.references = commit.references.filter(reference => {
            if (issues.indexOf(reference.issue) === -1) {
                return true
            }

            return false
        })

        return commit
    },
    groupBy: 'type',
    commitGroupsSort: (a, b) => {
        const commitGroupOrder = commits
            .map(({ group }) => group)
            .reverse()
        const gRankA = commitGroupOrder.indexOf(a.title)
        const gRankB = commitGroupOrder.indexOf(b.title)
        if (gRankA >= gRankB) {
            return -1
        } else {
            return 1
        }
    },
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
    notesSort: compareFunc,
    mainTemplate,
    commitPartial,
    headerPartial: '',
    footerPartial,
    finalizeContext: (context, options, commits) => {
        context.commitGroups.forEach(commitGroup => {
            const scopes = []
            commitGroup.commits.forEach(commit => {
                const { scope } = commit
                if (!scopes.includes(scope)) {
                    scopes.push(scope)
                }
            })
            commitGroup.scopes = scopes
                .map((eachScope) => {
                    return {
                        title: eachScope || '',
                        commits: commitGroup.commits.filter((commit) => commit.scope === eachScope)
                    }
                })
                .sort((a, b) => {
                    if (a.title === '') {
                        return -1 // 将 title 为 '' 的项排在前面
                    }
                    if (b.title === '') {
                        return 1 // 将 title 为 '' 的项排在前面
                    }
                    return a.title.localeCompare(b.title) // 按照 name 的默认排序顺序排列
                })
        })
        return context
    }
}
