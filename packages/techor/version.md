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
<p align="center">Smartly bump all workspace-dependent packages to specific versions</p>

<p align="center">
    <a aria-label="GitHub release (latest by date including pre-releases)" href="https://github.com/techor-dev/techor/releases">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/v/release/techor-dev/techor?include_prereleases&color=212022&label=&style=for-the-badge&logo=github&logoColor=fff">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/v/release/techor-dev/techor?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github&logoColor=%23000">
            <img alt="NPM Version" src="https://img.shields.io/github/v/release/techor-dev/techor?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github">
        </picture>
    </a>
    <a aria-label="NPM Package" href="https://www.npmjs.com/package/@techor/version">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/@techor/version?color=212022&label=%20&logo=npm&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/npm/dm/@techor/version?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
            <img alt="NPM package ( download / month )" src="https://img.shields.io/npm/dm/@techor/version?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
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
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/actions/workflow/status/techor-dev/techor/release.yml?branch=main&label=%20&message=twitter&color=212022&logo=githubactions&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/actions/workflow/status/techor-dev/techor/release.yml?branch=main&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
            <img alt="Github release actions" src="https://img.shields.io/github/actions/workflow/status/techor-dev/techor/release.yml?branch=main&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
        </picture>
    </a>
</p>

</div>

## Features

- Synchronize versions of packages in all workspaces
- Bump packages to a specific version by the `.workspaces` of `package.json`
- Bump versions by analyzing `dependencies` and `peerDependencies` of the workspace
- Prevent bumping versions for `private: true` packages

<br>

## Getting Started
```bash
npm i @techor/version
```

## Usage
```bash
techor version <version>
techor-version <version>
```
[Check out the available options here for now](https://github.com/techor-dev/techor/blob/beta/packages/version/src/bin/index.ts)

The command automatically bumps the version of all packages by scanning all workspaces and analyzing `dependencies` and `peerDependencies` of `package.json`

```diff
.
├── package.json
└── packages
    ├─── a
    |    └─── package.json
    ├─── b
    |    └─── package.json
    └─── c
         └─── package.json
```

This command scans all workspaces for dependencies with unspecified versions `""` considered a project package, then replaces them with the next version.

Now bump all dependent and workspace packages to a specified version:

```
techor version 1.2.0
```

<img width="628" alt="version" src="https://user-images.githubusercontent.com/33840671/204528593-a7a982f1-2e62-4a8e-95c3-122963f2254c.png">

`packages/a/package.json`

```diff
{
    "name": "a",
+   "version": "^1.2.0",
    "dependencies": {
-       "b": "",
+       "b": "^1.2.0"
    }
}
```

`packages/b/package.json`

```diff
{
    "name": "b",
+   "version": "^1.2.0"
}
```

`packages/c/package.json`

```diff
{
    "name": "c",
+   "version": "^1.2.0",
    "peerDependencies": {
-       "a": "",
+       "b": "^1.2.0"
    }
}
```

For version range, check out the [semver](https://github.com/npm/node-semver#versions)

Typically, you would use [Aron's semantic release](https://github.com/techor-dev/techor/tree/main/packages/semantic-release-config) with CI to automate the version and release commands.

<br>

<a aria-label="overview" href="https://github.com/techor-dev/techor#ecosystem">
<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=212022&style=for-the-badge">
    <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
    <img alt="NPM Version" src="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
</picture>
</a>