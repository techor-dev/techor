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
<p align="center">Author technology like a top leader</p>

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
            <img alt="Follow @aron1tw" src="https://img.shields.io/static/v1?label=%20&message=twitter&color=f6f7f8&logo=twitter&style=for-the-badge">
        </picture>
    </a>
    <a aria-label="Github Actions" href="https://github.com/1aron/repo/actions/workflows/release.yml">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/actions/workflow/status/1aron/techor/release.yml?branch=main&label=%20&message=twitter&color=212022&logo=githubactions&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/actions/workflow/status/1aron/techor/release.yml?branch=main&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
            <img alt="Github release actions" src="https://img.shields.io/github/actions/workflow/status/1aron/techor/release.yml?branch=main&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
        </picture>
    </a>
</p>

</div>

## Features

- Support multi-format JavaScript module configuration import like `master.css.{js,mjs,cjs,ts}`
- Ability to import ESM or Typescript modules in a CommonJS environment
- Support for deep configuration extensions
- Independent compilation options and user configuration

<br>

## Getting Started

```bash
npm i techor
```

## Setup

Add `packages/**` to `.workspaces` of the root `./package.json`
```json
{
    "workspaces": [
        "packages/**"
    ]
}
```
Install CLI and core packages by `techor`:
```bash
npm i techor -D
```
- Requires `npm@>=7` when using `npm`
- Set [`auto-install-peers`](https://pnpm.io/next/npmrc#auto-install-peers) when using `pnpm`
- You can also manually install [`peerDependencies`](https://github.com/1aron/techor/blob/beta/packages/techor/package.json#L32-L41) for fixed versions

To create your first package, you may automate the required steps to define a new workspace using `npm init`.

```bash
npm init -w ./packages/a
```

When the package is ready, including the dependencies setup, run `npm i` in the project root directory to install all dependencies, including the workspaces.

## Build system for monorepo

Most workspace packages will pre-set script commands, such as `build`, `test`, and `lint`. Since features depend on each other, builds will be executed sequentially.

You can now use [Turborepo](https://turbo.build/repo) to easily build complex systems and run commands in one-linear.

![turborepo-excalidraw](https://user-images.githubusercontent.com/33840671/204613029-cc4eaef9-ed82-400f-aa65-a1f1ec5864c7.jpeg)

Set up the `/turbo.json`:

```json
{
    "$schema": "https://turbo.build/schema.json",
    "pipeline": {
        "dev": {
            "cache": false,
            "dependsOn": ["^build"],
            "outputs": ["dist/**"]
        },
        "build": {
            "dependsOn": ["^build"],
            "outputs": ["dist/**"]
        },
        "test": {
            "outputs": [],
            "inputs": [
                "src/**/*.tsx",
                "src/**/*.ts",
                "tests/**/*.ts"
            ]
        },
        "lint": {
            "outputs": []
        },
        "type-check": {
            "outputs": ["dist/**"]
        }
    }
}
```

Set up the scripts of `/package.json`:
```json
{
    "scripts": {
        "dev": "turbo run dev",
        "build": "turbo run build",
        "test": "turbo run test --parallel",
        "lint": "turbo run lint --parallel",
        "type-check": "turbo run type-check --parallel"
    }
}
```
In most cases, `dev` and `build` cannot add the `--parallel` flag, which breaks their dependencies.

Typical workspace scripts for authoring a package:

```json
{
    "scripts": {
        "build": "ts-node ../techor/src/bin pack",
        "dev": "pnpm run build --watch",
        "test": "jest",
        "type-check": "tsc --noEmit",
        "lint": "eslint src"
    }
}
```

From now on, you only need to **run the command in the project root** after opening the project.

```bash
pnpm run dev
```
Build your application or package:
```bash
pnpm run build
```
Test your business logic or UI by running scripts:
```bash
pnpm run test
```
Find and fix problems in JavaScript code before building:
```bash
pnpm run lint
```
Improve reliability with TypeScript's type checking:
```bash
pnpm run type-check
```

### Continuous Integration

With the well-configured build system, almost all commands can be automated through CI, taking GitHub Actions as an example:

Build automated tests on the `beta`, the `main`, and the pull request stream:
```yml
name: Test
on:
    push:
        branches:
            - main
            - beta
    pull_request_target:
        types:
            - opened
            - synchronize

jobs:
    version:
        timeout-minutes: 15
        runs-on: ubuntu-20.04
        strategy:
            matrix:
                node-version: [20]
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
              with:
                  node-version: ${{ matrix.node-version }}
                  cache: 'npm'
            - run: npm ci
            - run: pnpm run build
            - run: pnpm run test
```
The same goes for `lint` and `type-check`.

While the `build` command will work with `deploy` and `release`, techor builds a complete package release workflow and the tools needed during it.

Next, check out the [Aron's semantic release](https://github.com/1aron/techor/tree/main/packages/semantic-release-config)

<br>

<a aria-label="overview" href="https://github.com/1aron/techor#ecosystem">
<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=212022&style=for-the-badge">
    <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
    <img alt="NPM Version" src="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
</picture>
</a>
