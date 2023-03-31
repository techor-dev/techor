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

**Packing**
- An extremely fast bundler built on top of [esbuild](https://esbuild.github.io/)
- Output or watch multiple formats in one-linear command
- Support **ESM**, **CJS**, and **IIFE** JavaScript modules
- Support **CSS** bundle
- Generate `.d.ts` type declarations
- Extract options from `package.json`
- Prevent bundling `dependencies` and `peerDependencies` by `package.json`

**Versioning**
- Synchronize versions of packages in all workspaces
- Bump packages to a specific version by the `.workspaces` of `package.json`
- Bump versions by analyzing `dependencies` and `peerDependencies` of the workspace
- Prevent bumping versions for `private: true` packages

<br>

## Getting Started

```bash
npm i techor
```

First, define your `Options` and `Config`:
```ts
import type { Options as TechorOptions } from 'techor'

interface Options extends TechorOptions<Config> {
    ...
}

interface Config {
    ...
}
```

## Usage

```ts
import Techor from 'techor'
```

### Create a techor instance

```ts
const techor = new Techor<Options, Config>()
```

### Extend the Techor
```ts
const defaultOptions = {}

class MyTech extends Techor<Options, Config> {
    constructor (
        options: Options
    ) {
        super(defaultOptions, options)
    }
    ...
}
```

## Properties

#### Read user config file by `options.config`
```ts
readConfig(): Config
```

#### Get user config path
```ts
get configPath(): string
```

#### Get resolved user config path
```ts
get resolvedConfigPath(): string
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

## Pack

Bundling your TypeScript and CSS packages with zero configuration.

```bash
techor pack [entryPaths...]
```

[Check out the available options here for now](https://github.com/1aron/techor/blob/beta/packages/techor/src/commands/pack.ts#L17-L25)

`techor pack` analyzes the `package.json` entry point relative to input sources in the `src` directory for builds.

### JavaScript packages

```diff
.
├── package.json
└── packages
    └─── a
         ├─── src
         │    ├─── index.ts
         │    └─── index.browser.ts
+        ├─── dist
+        │    ├─── index.js
+        │    ├─── index.mjs
+        │    ├─── index.d.ts
+        │    └─── index.browser.ts
         └─── package.json
```

Simultaneously output `cjs`, `esm`, `iife`, `type declarations` respectively according to `main`, `module`, `browser`, `types` of `package.json`

```json
{
    "name": "a",
    "scripts": {
        "build": "tsx ../techor/src/bin pack",
        "dev": "npm run build -- --watch"
    },
    "main": "dist/cjs/index.js",
    "browser": "dist/index.browser.js",
    "module": "dist/esm/index.js",
    "types": "dist/index.d.ts",
    "jsnext:main": "dist/esm/index.js",
    "esnext": "dist/esm/index.js",
    "exports": {
        ".": {
            "require": "./dist/cjs/index.js",
            "import": "./dist/esm/index.js",
            "types": "./dist/index.d.ts"
        }
    },
    "files": [
        "dist"
    ]
}
```
If you only want to pack specific javascript modules, remove the corresponding entry point from `package.json`.

Run with the above configuration:

```bash
npm run build
```

<img width="628" alt="cjs-esm-iife-type-pack" src="https://user-images.githubusercontent.com/33840671/204300928-23e2d2f9-b0ed-4feb-b7cf-1b9ba6cf8127.png">

Now import the above package `a` in your project or publish it.

```ts
import 'a'
```

### CSS packages

```diff
.
├── package.json
└── packages
    └─── b
         ├─── src
         │    └─── index.css
+        ├─── dist
+        │    └─── index.css
         └─── package.json
```

Packaging CSS is more straightforward, configuring `style` and `main` entry points in `package.json`.

```json
{
    "name": "b",
    "scripts": {
        "build": "tsx ../techor/src/bin pack",
        "dev": "npm run build -- --watch"
    },
    "main": "./dist/index.css",
    "style": "./dist/index.css",
    "files": [
        "dist"
    ]
}
```

Run with the above configuration:

```bash
npm run build
```

<img width="523" alt="css-pack" src="https://user-images.githubusercontent.com/33840671/204450194-7831c448-2e21-4ce8-8c45-5139febc10e6.png">

Now import the above package `b` in your project or publish it.

```css
@import 'b'
```

### Multiple entry points

`techor pack <entryPaths...>` supports glob patterns that let you specify multiple entry points at once, including the output of nested directories.

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
The same goes for multiple CSS entries:
```
techor src/**/*.css
```
```diff
.
├── package.json
└── packages
    └─── a
         ├─── src
         │    ├─── index.css
         │    └─── components
         │         ├─── card.css
         │         └─── button.css
+        ├─── dist
+        │    ├─── index.css
+        │    └─── components
+        │         ├─── card.css
+        │         └─── button.css
         └─── package.json
```
Usually, it would be best to bundle CSS packages through a main `index.css` and output other CSS files so developers can import on demand instead of the whole package. For example [@master/keyframes.css](https://www.npmjs.com/package/@master/keyframes.css)

### Exclude external dependencies
`techor pack` automatically excludes external dependencies to be bundled by the `.dependencies` and `peerDependencies` of `package.json`

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
    "main": "dist/cjs/index.js",
    "exports": {
        ".": {
            "require": "./dist/cjs/index.js"
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
techor pack --platform node
```

<img width="568" alt="exclude-externals-pack" src="https://user-images.githubusercontent.com/33840671/204489494-10854837-be15-49fd-a1c8-0e02fb3e174a.png">

`@master/css.webpack` is bundled into `dist/cjs/index.js`, except for `@master/css` and `@master/style-element.react`.

So if there is an external package that needs to be bundled, you just install it to `devDependencies` via `npm i <some-package> --save-dev`, then `techor pack` will not exclude it.

### Multiple outputs

`techor pack` defaults to pack multiple outputs with different formats and platforms according to `exports` `bin` in `package.json`.

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
            "require": "./dist/cjs/index.js",
            "import": "./dist/esm/index.js"
        },
        "./utils/exec": {
            "require": "./dist/utils/exec.cjs",
            "import": "./dist/utils/exec.mjs"
        }
    }
}
```
Any nested conditions in `exports` like `node`, `browser`, `default`, `require`, and `import` will be mapped to ESBuild’s `format` and `platform` options.

## Version
Smartly bump all workspace-dependent packages to specific versions.

```bash
techor version <version>
```

[Check out the available options here for now](https://github.com/1aron/techor/blob/beta/packages/techor/src/commands/version.ts#L16-L18)

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

Typically, you would use [Aron's semantic release](https://github.com/1aron/techor/tree/main/packages/semantic-release-config) with CI to automate the version and release commands.

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
            "dependsOn": ["^build"]
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
        "build": "tsx ../techor/src/bin pack",
        "dev": "npm run build -- --watch",
        "test": "jest",
        "type-check": "tsc --noEmit",
        "lint": "eslint src"
    }
}
```

From now on, you only need to **run the command in the project root** after opening the project.

```bash
npm run dev
```
Build your application or package:
```bash
npm run build
```
Test your business logic or UI by running scripts:
```bash
npm run test
```
Find and fix problems in JavaScript code before building:
```bash
npm run lint
```
Improve reliability with TypeScript's type checking:
```bash
npm run type-check
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
                node-version: [18.12.1]
        steps:
            - uses: actions/checkout@v3
            - uses: actions/setup-node@v3
              with:
                  node-version: ${{ matrix.node-version }}
                  cache: 'npm'
            - run: npm ci
            - run: npm run build
            - run: npm run test
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