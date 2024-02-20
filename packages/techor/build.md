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
<p align="center">Build a perfect JavaScript package with a one-liner command</p>

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
- An extremely fast JavaScript bundler built on top of [Rollup](https://rollupjs.org/) and [SWC](https://swc.rs/)
- Output or watch multiple formats in one-linear command
- Support **ESM**, **CJS**, and **IIFE** JavaScript modules
- Generate `.d.ts` type declarations
- Extract options from `package.json`
- Prevent bundling `dependencies`, `peerDependencies`, `optionalDependencies` by `package.json`

<br>

## Getting Started
```bash
npm i techor
```

## Usage
```bash
techor build [entryPaths...]
```

[Check out the available options here for now](https://github.com/1aron/techor/blob/beta/packages/techo/src/bin/index.ts)

`techor build` analyzes the `package.json` entry point relative to input sources in the `src` directory for builds.

### JavaScript packages

```diff
.
├── package.json
└── packages
    └─── a
         ├─── src
         │    ├─── index.ts
         │    └─── global.ts
+        ├─── dist
+        │    ├─── index.js
+        │    ├─── index.mjs
+        │    ├─── index.d.ts
+        │    └─── global.ts
         └─── package.json
```

Simultaneously output `cjs`, `esm`, `iife`, `type declarations` respectively according to `main`, `module`, `browser`, `types` of `package.json`

```json
{
    "name": "a",
    "scripts": {
        "build": "ts-node ../techor/src/bin build",
        "dev": "pnpm run build --watch"
    },
    "main": "dist/index.js",
    "browser": "dist/global.js",
    "module": "dist/index.js",
    "types": "dist/index.d.ts",
    "esnext": "dist/index.js",
    "exports": {
        ".": {
            "require": "./dist/index.js",
            "import": "./dist/index.js",
            "types": "./dist/index.d.ts"
        }
    },
    "files": [
        "dist"
    ]
}
```
If you only want to build specific javascript modules, remove the corresponding entry point from `package.json`.

Run with the above configuration:

```bash
pnpm run build
```

<img width="628" alt="cjs-esm-iife-type-build" src="https://user-images.githubusercontent.com/33840671/204300928-23e2d2f9-b0ed-4feb-b7cf-1b9ba6cf8127.png">

Now import the above package `a` in your project or publish it.

```ts
import 'a'
```

### Multiple entry points

`techor build <entryPaths...>` supports glob patterns that let you specify multiple entry points at once, including the output of nested directories.

Specifying an entry point will cause the JavaScript output `format` to be preset to `cjs,esm`.

```
techor src/**/*.ts
```
```diff
.
├── package.json
└── packages
    └─── a
         ├─── src
         │    ├─── index.ts
         │    └─── utils
         │         └─── exec.ts
+        ├─── dist
+        │    ├─── index.js
+        │    ├─── index.mjs
+        │    └─── utils
+        │         ├─── exec.cjs
+        │         └─── exec.mjs
         └─── package.json
```

### Exclude external dependencies
`techor build` automatically excludes external dependencies to be bundled by the `.dependencies` and `peerDependencies` of `package.json`

`src/index.ts`
```ts
import '@master/css'
import '@master/css.webpack'
import '@master/style-element.react'
```

`package.json`
```json
{
    "name": "externals",
    "main": "dist/index.js",
    "exports": {
        ".": {
            "require": "./dist/index.js"
        }
    },
    "files": [
        "dist"
    ],
    "dependencies": {
        "@master/css": "^2.0.0-beta.55"
    },
    "peerDependencies": {
        "@master/style-element.react": "^2.0.0-beta.7"
    },
    "devDependencies": {
        "@master/css.webpack": "^2.0.0-beta.55"
    }
}
```

Run with the above setup:

```bash
techor build --platform node
```

<img width="568" alt="exclude-externals-build" src="https://user-images.githubusercontent.com/33840671/204489494-10854837-be15-49fd-a1c8-0e02fb3e174a.png">

`@master/css.webpack` is bundled into `dist/index.js`, except for `@master/css` and `@master/style-element.react`.

So if there is an external package that needs to be bundled, you just install it to `devDependencies` via `npm i <some-package> --save-dev`, then `techor build` will not exclude it.

### Multiple outputs

`techor build` defaults to build multiple outputs with different formats and platforms according to `exports` `bin` in `package.json`.

```diff
.
├── package.json
└── packages
    └─── a
         ├─── src
         │    ├─── index.ts
         │    └─── utils
         │         └─── exec.ts
+        ├─── dist
+        │    ├─── index.js
+        │    ├─── index.mjs
+        │    └─── utils
+        │         ├─── exec.cjs
+        │         └─── exec.mjs
         └─── package.json
```
`package.json`
```json
{
    "name": "externals",
    "exports": {
        ".": {
            "require": "./dist/index.js",
            "import": "./dist/index.js"
        },
        "./utils/exec": {
            "require": "./dist/utils/exec.cjs",
            "import": "./dist/utils/exec.mjs"
        }
    }
}
```
Any nested conditions in `exports` like `node`, `browser`, `default`, `require`, and `import` will be mapped to Rollup's `format` and `platform` options.

## Options
https://github.com/1aron/techor/tree/main/packages/techor/src/config.ts

<br>

<a aria-label="overview" href="https://github.com/1aron/techor#ecosystem">
<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=212022&style=for-the-badge">
    <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
    <img alt="NPM Version" src="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
</picture>
</a>