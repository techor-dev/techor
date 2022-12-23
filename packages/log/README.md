<br>
<div align="center">

<p align="center">A set of human-friendly and beautiful console log syntax</p>

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
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/@techor/log?color=212022&label=%20&logo=npm&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/npm/dm/@techor/log?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
            <img alt="NPM package ( download / month )" src="https://img.shields.io/npm/dm/@techor/log?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
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

## Getting Started

```
npm install @techor/log
```

### Usage

```ts
import log from '@techor/log'
```

<img width="681" alt="@techor/log" src="https://user-images.githubusercontent.com/33840671/208868901-792d5a3d-5c5e-4da8-8c5a-e4d44f3384ee.png">

```ts
log(new Error('Foo'))

log`[compile] test 3 items \`bg:red\` test ${'omg'} fwe [few] fuck20ms 20ms`
log`${[1, 2, 3]}`
log`-> prettier arrow`
log`<- prettier arrow`
log`**highlight**`
log`*italic*`
log`~~strikethrough~~`
log`__underline__`
log`!!warning!!`
log`..silence..`
log`up +1+`
log`down -1-`
log`(normal)`
log`[normal]`
log`<normal>`
log`npx create-next-app <project>`
log`5:24:11 AM test`
log`dist/index.cjs.map 15.5KB`
log`$t show timestamp`

log.add`add +3+ files`
log.del`delete -3- files`
log.conflict`Custom elements cannot be defined again`
log.fail`too many requests`
log.info`build in 3ms`

console.log('')
log.i`change File change detected. Starting incremental compilation...`
log.i`File change detected. Starting incremental compilation...`
log.i`esm ${4} entries`
log.i`cjs ${4} entries`
log.i`iife ${4} entries`
log.i`entries`

console.log('')
log.error`Type Cannot use import statement outside a module`

console.log('')
log.conflict`Version Custom elements cannot be defined again`

console.log('')
log.pass`Test ${3} cases`

console.log('')
log.ok`Up to date, audited *1076* packages in .786ms.`

console.log('')
log.del`Delete -3- files`
log.add`Add +3+ files`

console.log('')
log.o`Valid commit format "Fix(Compiler): Import user config file path problem"`
log.x`Invalid commit format .Aron Conventional Commits.`

console.log('')
log.success`All files exported to desktop ${3}`
log.warn`Warn Same file name`
log.fail`Too many requests`

log`${[1, 2, 3, 'fg:blue', 'text:center', 'italic', true, false]}`
```

<br>

<a aria-label="overview" href="https://github.com/1aron/techor">
<picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=212022&style=for-the-badge">
    <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
    <img alt="NPM Version" src="https://img.shields.io/badge/%E2%AC%85%20back%20to%20contents-%20?color=f6f7f8&style=for-the-badge">
</picture>
</a>