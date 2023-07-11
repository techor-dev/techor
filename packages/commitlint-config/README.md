<br>
<div align="center">

<p align="center">
    <a href="https://repo.master.co">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/33840671/227841265-4fd5a57c-0eb8-4fcf-a8ff-a266c990010c.svg">
            <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/33840671/227841250-bfe4af56-2394-4101-b3ba-a4086f171ead.svg">
            <img alt="techor" src="https://user-images.githubusercontent.com/33840671/227841250-bfe4af56-2394-4101-b3ba-a4086f171ead.svg" width="100%">
        </picture>
    </a>
</p>
<p align="center">Check your commits with Techor's commitlint config</p>

<p align="center">
    <a aria-label="overview" href="https://github.com/1aron/techor">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/%E2%AC%85%20back-%20?color=212022&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/%E2%AC%85%20back-%20?color=f6f7f8&style=for-the-badge">
            <img alt="NPM Version" src="https://img.shields.io/badge/%E2%AC%85%20back-%20?color=f6f7f8&style=for-the-badge">
        </picture>
    </a>
    <a aria-label="GitHub release (latest by date including pre-releases)" href="https://github.com/1aron/techor/releases">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/v/release/1aron/techor?include_prereleases&color=212022&label=&style=for-the-badge&logo=github&logoColor=fff">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/v/release/1aron/techor?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github&logoColor=%23000">
            <img alt="NPM Version" src="https://img.shields.io/github/v/release/1aron/techor?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github">
        </picture>
    </a>
    <a aria-label="NPM Package" href="https://www.npmjs.com/package/commitlint-config-techor">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/commitlint-config-techor?color=212022&label=%20&logo=npm&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/npm/dm/commitlint-config-techor?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
            <img alt="NPM package ( download / month )" src="https://img.shields.io/npm/dm/commitlint-config-techor?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
        </picture>
    </a>
    <a aria-label="Follow @aron1tw" href="https://twitter.com/aron1tw">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/static/v1?label=%20&message=twitter&color=212022&logo=twitter&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/static/v1?label=%20&message=twitter&color=f6f7f8&logo=twitter&style=for-the-badge">
            <img alt="Follow @mastercorg" src="https://img.shields.io/static/v1?label=%20&message=twitter&color=f6f7f8&logo=twitter&style=for-the-badge">
        </picture>
    </a>
    <a aria-label="Github Actions" href="https://github.com/1aron/techor/actions/workflows/release.yml">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/actions/workflow/status/1aron/techor/release.yml?branch=beta&label=%20&message=twitter&color=212022&logo=githubactions&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/actions/workflow/status/1aron/techor/release.yml?branch=beta&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
            <img alt="Github release actions" src="https://img.shields.io/github/actions/workflow/status/1aron/techor/release.yml?branch=beta&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
        </picture>
    </a>
</p>

</div>

<br>

## Getting Started

Skip if you have already run `npm install techor`:
```
npm install commitlint-config-techor -D
```

### Configuration
Create a `.commitlintrc.yml` file in your project root and extend `techor`:
```yml
extends: techor
```

### Set up Husky
Use Husky to register Git Hooks to automatically check whether it is legal before committing.

```
npx husky install
```

```
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

Check if the `.husky` is successfully generated in the project root:
```diff
+ └── .husky
+     ├─── _
+     └─── commit-msg
```

From now on, you just need to commit; the check happens after the commit. If everything is legal, there will be no prompts.

### package.json
Pre-commit checks via Git Hook are only enabled when other team members clone the project and run `npm install`.

Save `commit-check` and `husky install` commands for teamwork and CI:
```json
{
    "scripts": {
        "install": "husky install",
        "commit-check": "commitlint --from=HEAD~1 --verbose"
    }
}
```

`npm run commit-check`:

<img width="581" alt="commit-check" src="https://user-images.githubusercontent.com/33840671/205993191-bf48b3ef-8884-4ea3-991c-4ec782151d4b.png">

## Continuous Integration
Typically, you double-check commits before publishing and on relevant workflows, using GitHub Actions as an example:

[Create a workflow](https://docs.github.com/en/actions/quickstart) for commit check `/.github/workflows/commit-check.yml`:
```yml
name: Commit Check
on:
    push:
        branches:
            - '**'
    pull_request_target:
        types:
            - opened
            - reopened
            - edited
            - synchronize

jobs:
    check:
        timeout-minutes: 15
        runs-on: ubuntu-20.04
        strategy:
            matrix:
                node-version: [18]
        steps:
            - uses: actions/checkout@v3
              with:
                  fetch-depth: 0
            - uses: actions/setup-node@v3
              with:
                  node-version: ${{ matrix.node-version }}
                  cache: 'npm'
            - run: npm ci
            - run: npm run commit-check

```

## Commit Header Format
The header has a particular format that includes a `Type`, a `Target`, and a `Summary`:

```
Type(Target): Summary
  ┊     ┊
  ┊     └─⫸ Target: Workspace, Package or Role
  ┊
  └─⫸ Type: Bump, Feat, New, Perf, Add, Update, Improve, Fix, Deprecate, Drop, Docs, Upgrade, Revert, Example, Test, Refactor, Chore, Misc
```

For the full documentation, check out the [Techor's conventional commits](https://github.com/1aron/techor/tree/main/packages/conventional-commits)

<br>

<a aria-label="overview" href="https://github.com/1aron/techor#ecosystem">
<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=212022&style=for-the-badge">
    <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
    <img alt="NPM Version" src="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
</picture>
</a>