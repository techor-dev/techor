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
<p align="center">A monorepo ecosystem integrating first-class packages and build systems</p>

<p align="center">
    <a aria-label="GitHub release (latest by date including pre-releases)" href="https://github.com/1aron/techor/releases">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/v/release/1aron/techor?include_prereleases&color=212022&label=&style=for-the-badge&logo=github&logoColor=fff">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/v/release/1aron/techor?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github&logoColor=%23000">
            <img alt="NPM Version" src="https://img.shields.io/github/v/release/1aron/techor?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github">
        </picture>
    </a>
    <a aria-label="NPM Package" href="https://www.npmjs.com/package/techor">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/techor?color=212022&label=%20&logo=npm&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/npm/dm/techor?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
            <img alt="NPM package ( download / month )" src="https://img.shields.io/npm/dm/techor?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
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

## Ecosystem

##### Build System
- [techor](https://github.com/1aron/techor/tree/main/packages/techor) - A monorepo build system and workflow

##### Convention

- [techor-conventional-commits](https://github.com/1aron/techor/tree/main/packages/conventional-commits) - A human-readable set of conventional commits, with version rules and changelog groupings
- [conventional-changelog-techor](https://github.com/1aron/techor/tree/main/packages/conventional-changelog-config) - Beautiful changelog based on Techor's conventional commits

##### Release
- [semantic-release-config-techor](https://github.com/1aron/techor/tree/main/packages/semantic-release-config) - Techor's semantic release config for publishing workspace packages

##### Packing
- [techor pack](https://github.com/1aron/techor/tree/main/packages/techor#pack) - Bundling your TypeScript and CSS packages with zero configuration

##### Versioning
- [techor version](https://github.com/1aron/techor/tree/main/packages/techor#version) - Smartly bump all workspace-dependent packages to specific versions

##### Linting
- [eslint-config-techor](https://github.com/1aron/techor/tree/main/packages/eslint-config) - Techor's eslint config
- [commitlint-config-techor](https://github.com/1aron/techor/tree/main/packages/commitlint-config) - Check your commits with Techor's commitlint config

##### Testing
- [techor-jest](https://github.com/1aron/techor/tree/main/packages/jest) - Techor's jest preset to improve performance
- [techor-web-jest](https://github.com/1aron/techor/tree/main/packages/web-jest) - Techor's jest preset for web

##### Continuous Integration
- [techor-github-actions](https://github.com/1aron/techor/tree/main/packages/github-actions) - A set of GitHub Actions for techor ecosystem includes PR title checks

##### Utilities
- [extend](https://github.com/1aron/techor/tree/main/packages/extend) — Deeply extend objects ~380B
- [a plain obj](https://github.com/1aron/techor/tree/main/packages/is-plain-obj) — Is it a plain object? ~100B
- [cross import](https://github.com/1aron/techor/tree/main/packages/cross-import) — Import .ts, .mjs, .cjs files across environments as JavaScript modules
- [explore config](https://github.com/1aron/techor/tree/main/packages/explore-config) — Explore multi-format JavaScript module configuration
- [fs](https://github.com/1aron/techor/tree/main/packages/fs) — A human-friendly file system with glob patterns
- [read workspace packages](https://github.com/1aron/techor/tree/main/packages/read-workspace-packages) — Read workspace package.json contents
- [query workspaces](https://github.com/1aron/techor/tree/main/packages/query-workspaces) — Query workspaces with package.json

## Built on the top
- [turborepo](https://turbo.build/repo) - A high-performance build system for monorepo
- [esbuild](https://esbuild.github.io/) - An extremely fast JavaScript and CSS bundler and minifier
- [semantic-release](https://www.typescriptlang.org/) - Fully automated version management and package publishing
- [typescript](https://www.typescriptlang.org/) - A strongly typed programming language that builds on JavaScript
- [commitlint](https://github.com/conventional-changelog/commitlint) - Lint commit messages
- [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) - Generate changelogs and release notes from a project's commit messages and metadata
- [eslint](https://eslint.org/) - Find and fix problems in your JavaScript code
- [husky](https://typicode.github.io/husky) - Modern native Git hooks made easy
- [jest](https://jestjs.io/) - Delightful JavaScript Testing.

## Who's using techor?

- [Master CSS](https://css.master.co/) - A Virtual CSS language with enhanced syntax
- [Master Style Element](https://github.com/master-co/style-element) - Create reusable style elements using class names in one-linear

## Contributing
Please see the documentation [CONTRIBUTING](https://github.com/1aron/techor/blob/beta/.github/CONTRIBUTING.md) for workflow.
