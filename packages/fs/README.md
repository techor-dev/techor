<br>
<div align="center">

<p align="center">Read a file content by glob patterns</p>

<p align="center">
    <a aria-label="overview" href="https://github.com/1aron/utils">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/%E2%AC%85%20back-%20?color=212022&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/%E2%AC%85%20back-%20?color=f6f7f8&style=for-the-badge">
            <img alt="NPM Version" src="https://img.shields.io/badge/%E2%AC%85%20back-%20?color=f6f7f8&style=for-the-badge">
        </picture>
    </a>
    <a aria-label="GitHub release (latest by date including pre-releases)" href="https://github.com/1aron/utils/releases">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/v/release/1aron/utils?include_prereleases&color=212022&label=&style=for-the-badge&logo=github&logoColor=fff">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/v/release/1aron/utils?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github&logoColor=%23000">
            <img alt="NPM Version" src="https://img.shields.io/github/v/release/1aron/utils?include_prereleases&color=f6f7f8&label=&style=for-the-badge&logo=github">
        </picture>
    </a>
    <a aria-label="NPM Package" href="https://www.npmjs.com/package/@techor/fs">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/@techor/fs?color=212022&label=%20&logo=npm&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/npm/dm/@techor/fs?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
            <img alt="NPM package ( download / month )" src="https://img.shields.io/npm/dm/@techor/fs?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
        </picture>
    </a>
    <a aria-label="Follow @aron1tw" href="https://twitter.com/aron1tw">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/static/v1?label=%20&message=twitter&color=212022&logo=twitter&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/static/v1?label=%20&message=twitter&color=f6f7f8&logo=twitter&style=for-the-badge">
            <img alt="Follow @mastercorg" src="https://img.shields.io/static/v1?label=%20&message=twitter&color=f6f7f8&logo=twitter&style=for-the-badge">
        </picture>
    </a>
    <a aria-label="Github Actions" href="https://github.com/1aron/utils/actions/workflows/release.yml">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/actions/workflow/status/1aron/utils/release.yml?branch=main&label=%20&message=twitter&color=212022&logo=githubactions&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/actions/workflow/status/1aron/utils/release.yml?branch=main&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
            <img alt="Github release actions" src="https://img.shields.io/github/actions/workflow/status/1aron/utils/release.yml?branch=main&label=%20&message=twitter&color=f6f7f8&logo=githubactions&style=for-the-badge&logoColor=%23000">
        </picture>
    </a>
</p>

</div>

<br>

## Getting Started

```bash
npm install @techor/fs
```

## Usage
```ts
readFile(source?: fg.Pattern | fg.Pattern[], options?: Options): Buffer
readFileAsStr(source?: fg.Pattern | fg.Pattern[], options?: Options): string
readFileAsJSON(source?: fg.Pattern | fg.Pattern[], options?: Options): any
readFiles(source?: fg.Pattern | fg.Pattern[], options?: Options): Buffer[]

writeToFile(filePath: fs.PathOrFileDescriptor, data: any, options?: WriteToFileOptions): void
```

`a.json`
```json
{ "name": "a" }
```
`b.json`
```json
{ "name": "b" }
```
```js
import { readFile, readFiles } from '@techor/fs'

readFile('a.*')
// Buffer

readFile('./fewjiogw/wiefoiwe')
// undefined

readFileAsStr('a.*')
// '{ "name": "a" }'

readFileAsJSON('./package.json')
// { "name": "root", ... }

readFileAsJSON('./package.json', { cwd: path.resolve('./packages/a') })
// { "name": "a", ... }

readFiles('*.json').toString()
// [Buffer, Buffer]
```

## Options
File reading methods inherit [fast-glob options](https://github.com/mrmlnc/fast-glob#options-3)
```js
{
    cwd: process.cwd()
}
```
With additional options:
```ts
{
    encoding?: null
    flag?: string
}
```

<br>

<a aria-label="overview" href="https://github.com/1aron/utils#utilities">
<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=212022&style=for-the-badge">
    <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
    <img alt="NPM Version" src="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
</picture>
</a>
