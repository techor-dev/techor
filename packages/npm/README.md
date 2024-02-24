<br>
<div align="center">

<p align="center">Get, query, and read such as package workspaces via NPM/PNPM.</p>

<p align="center">
    <a aria-label="overview" href="https://github.com/techor-dev/techor">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/%E2%AC%85%20back-%20?color=212022&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/%E2%AC%85%20back-%20?color=f6f7f8&style=for-the-badge">
            <img alt="NPM Version" src="https://img.shields.io/badge/%E2%AC%85%20back-%20?color=f6f7f8&style=for-the-badge">
        </picture>
    </a>
    <a aria-label="GitHub release (latest by date including pre-releases)" href="https://github.com/techor-dev/techor/releases">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/v/release/techor-dev/techor?include_prereleases&color=212022&label=&style=for-the-badge&logo=github&logoColor=fff">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/v/release/techor-dev/techor?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github&logoColor=%23000">
            <img alt="NPM Version" src="https://img.shields.io/github/v/release/techor-dev/techor?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github">
        </picture>
    </a>
    <a aria-label="NPM Package" href="https://www.npmjs.com/package/@techor/npm">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/@techor/npm?color=212022&label=%20&logo=npm&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/npm/dm/@techor/npm?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
            <img alt="NPM package ( download / month )" src="https://img.shields.io/npm/dm/@techor/npm?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
        </picture>
    </a>
    <a aria-label="Follow @aron1tw" href="https://twitter.com/aron1tw">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/static/v1?label=%20&message=twitter&color=212022&logo=twitter&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/static/v1?label=%20&message=twitter&color=f6f7f8&logo=twitter&style=for-the-badge">
            <img alt="Follow @mastercorg" src="https://img.shields.io/static/v1?label=%20&message=twitter&color=f6f7f8&logo=twitter&style=for-the-badge">
        </picture>
    </a>
    <a aria-label="Github Actions" href="https://github.com/techor-dev/techor/actions/workflows/release.yml">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/actions/workflow/status/techor-dev/techor/release.yml?branch=main&label=%20&message=twitter&color=212022&logo=githubactions&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/actions/workflow/status/techor-dev/techor/release.yml?branch=main&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
            <img alt="Github release actions" src="https://img.shields.io/github/actions/workflow/status/techor-dev/techor/release.yml?branch=main&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
        </picture>
    </a>
</p>

</div>

<br>

## queryWorkspaces()

- By default, read `.workspaces` of package.json in the current working directory
- By default, workspaces in node_modules are excluded

Your monorepo usually looks like this:

```diff
.
├── package.json
└── packages
+   ├─── a
    │    └─── package.json
+   ├─── b
    │    ├─── node_modules
    │    │    └─── fake-module
    │    │         └─── package.json
+   │    ├─── bb
    │    │    └─── package.json
    │    └─── package.json
    └─── c
```
./package.json
```json
{
    "workspaces": ["packages/**"]
}
```

### Usage
`queryWorkspaces(patterns?, options?): string[]`
```js
import queryWorkspaces from '@techor/npm'

const workspaces = queryWorkspaces()
// ['packages/a', 'packages/b', 'packages/b/bb']

const workspaces = queryWorkspaces(['packages/*'])
// ['packages/a', 'packages/b']
```

### Options
Inherited from [fast-glob options](https://github.com/mrmlnc/fast-glob#options-3)
```js
{
    cwd: process.cwd(),
    ignore: ['**/node_modules/**']
}
```

## readWorkspacePackages()

- By default, read workspace packages by package.json `.workspaces` in the current working directory
- By default, workspace packages in node_modules are excluded

Your monorepo usually looks like this:

```diff
.
├── package.json
└── packages
    ├─── a
    │    └─── package.json
    ├─── b
    │    ├─── node_modules
    │    │    └─── fake-module
    │    │         └─── package.json
    │    ├─── bb
    │    │    └─── package.json
    │    └─── package.json
    ├─── c
    └─── d
         └─── package.json
```
./package.json
```json
{
    "workspaces": ["packages/**"]
}
```
./packages/d/package.json
```json
{
    "name": "d",
    "private": true
}
```

### Usage
`readWorkspacePackages(patterns?, options?): any[]`
```js
import readWorkspacePackages from '@techor/read-workspace-packages'

const packages = readWorkspacePackages()
// [{ name: 'a' }, { name: 'b' }, { name: 'd', private: true }, { name: 'bb' }]

const packages = readWorkspacePackages(['packages/*'])
// [{ name: 'a' }, { name: 'b' }, { name: 'd', private: true }]

const publicPackages = readWorkspacePackages()
    .fiter((eachWorkspacePackage) => !eachWorkspacePackage.private)
// [{ name: 'a' }, { name: 'b' }, { name: 'bb' }]
```

### Options
Inherited from [fast-glob options](https://github.com/mrmlnc/fast-glob#options-3)
```js
{
    cwd: process.cwd(),
    ignore: ['**/node_modules/**']
}
```

<br>

<a aria-label="overview" href="https://github.com/techor-dev/techor#utilities">
<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=212022&style=for-the-badge">
    <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
    <img alt="NPM Version" src="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
</picture>
</a>
