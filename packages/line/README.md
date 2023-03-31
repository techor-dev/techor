<br>
<div align="center">

<p align="center">Conditionally assign and trim strings into one line ~250B</p>

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
    <a aria-label="NPM Package" href="https://www.npmjs.com/package/to-line">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/to-line?color=212022&label=%20&logo=npm&style=for-the-badge">
            <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/npm/dm/to-line?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
            <img alt="NPM package ( download / month )" src="https://img.shields.io/npm/dm/to-line?color=f6f7f8&label=%20&logo=npm&style=for-the-badge">
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
```sh
npm install to-line
```

```js
import line from 'to-line';
// or
import { l } from 'to-line';
```
`line` is equal to `l`

### Strings
```js
line`a ${true && 'b'} c`;
// 'a b c'
```

### Objects
```js
line`a ${{ b: true, c: false, d: isTrue() }} e`;
// 'a b d e'
```

### Arrays
```js
line`a ${['b', 0, false, 'c']} d`;
// 'a b c d'
```

### Resolve types
```js
line`a ${true} ${false} ${''} ${null} ${undefined} ${0} ${NaN} b`
// 'a b'
```

### Trim and clear
- Remove newlines
- Convert consecutive spaces to one space
```js
line`
    a
    b
    ${undefined}
    c    d
`
// 'a b c d'
```

### Mixed and nested
```js
line`
    a
    ${
        [
            1 && 'b',
            { c: false, d: null },
            ['e', ['f']]
        ]
    }
    g    h
`;
// 'a b e f g h'
```

### Execute like a function
```js
line`a b ${['c', 'd']} ${{ e: true, f: false }} ${true && 'g'}`;
// or
line('a b', ['c', 'd'], { e: true, f: false }, true && 'g');

// 'a b c d e g'
```

## Related
- [@master/style-element](https://github.com/master-co/style-element) - Quickly create styled React elements with conditional class names
- [@master/css](https://github.com/master-co/css) - A Virtual CSS language with enhanced syntax

## Inspiration
- [clsx](https://github.com/lukeed/clsx) - A tiny utility for constructing `className` strings conditionally