<br>
<div align="center">

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

- Support multi-format JavaScript module configuration import like `master.css.{js,mjs,cjs,ts}`
- Ability to import ESM or Typescript modules in a CommonJS environment
- Support for deep configuration extensions
- Independent compilation options and user configuration

<br>

## Getting Started

```bash
npm i techor
```

First, define your `Options` and `Config`:
```ts
import type { TechorOptions } from 'techor'

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