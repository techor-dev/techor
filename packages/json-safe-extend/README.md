<br>
<div align="center">

<p align="center">Deeply extend JSON-safe objects ~300B</p>

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
    <a aria-label="NPM Package" href="https://www.npmjs.com/package/json-safe-extend">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/json-safe-extend?color=212022&label=%20&logo=npm&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/npm/dm/json-safe-extend?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
            <img alt="NPM package ( download / month )" src="https://img.shields.io/npm/dm/json-safe-extend?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
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

- Deeply extend
- JSON-safe
- Supports `Symbol`

<br>

## Getting Started

```bash
npm install json-safe-extend
```

## Usage
```js
import extend from 'json-safe-extend'

extend({ a: 1, b:2 }, { b: null, c:3 })
// { a:1, b: null, c:3 }
```

## Overview
```js
expect(
    extend(
        {
            a: 1,
            b: 2,
            d: {
                a: 1,
                b: [],
                c: { test1: 123, test2: 321 }
            },
            f: 5,
            g: 123,
            i: 321,
            j: [1, 2]
        },
        {
            b: 3,
            c: 5,
            d: {
                b: { first: 'one', second: 'two' },
                c: { test2: 222 }
            },
            e: { one: 1, two: 2 },
            f: [],
            g: (void 0),
            i: null,
            j: [3, 4]
        }
    )
)
    .toEqual({
        a: 1,
        b: 3,
        d:
        {
            a: 1,
            b: { first: 'one', second: 'two' },
            c: { test1: 123, test2: 222 }
        },
        f: [],
        g: undefined,
        c: 5,
        e: { one: 1, two: 2 },
        i: null,
        j: [3, 4]
    })
```