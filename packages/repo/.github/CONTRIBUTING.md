# Contributing
This guide follows the relevant specifications and presets of [Aronrepo](https://github.com/1aron/techor):

- [Techor's Conventional Commits](https://github.com/1aron/techor/tree/main/packages/conventional-commits)
- [Techor's ESLint Config](https://github.com/1aron/techor/tree/main/packages/eslint-config)
- [Techor's Jest Preset](https://github.com/1aron/techor/tree/main/packages/jest)
- [Techor's Web Jest Preset](https://github.com/1aron/techor/tree/main/packages/web-jest)

## Developing
Split a new terminal and run `npm run dev` in the project root to watch all packages change and build:
```bash
npm run dev
```
Split a new terminal and switch to the target directory for testing to avoid running tests from other packages:
```bash
cd packages/target
```
```bash
npm run test -- --watch
```

## Testing
```bash
npm run test
```

### Contributing your test cases
Taking the [Master CSS project](https://github.com/master-co/css/tree/beta) as an example, you can freely create a file like [packages/css/tests/contributions/techor.test.ts](https://github.com/master-co/css/tree/dev/beta/packages/css/tests/contributions) for unit testing:

```ts
import { testProp, testCSS } from '../src/utils/test-css'

it('should generated with `background-color:` instead of `background:`', () => {
    testProp('bg:red', 'background-color:#d11a1e')
})

it('should contain the `:hover` selector', () => {
    testProp('fg:white:hover', '.f\\:white\\:hover:hover{color:#ffffff}')
})
```

Commit your tests ( and create a Pull Request ):
```bash
Add @1aron tests
```

## Linting
```bash
npm run lint
```

To automatically fix any violations in your code:
```
npm run lint -- --fix
```

## Type Checking
```bash
npm run type-check
```

## Commit Checking
```bash
npm run commit-check
```

## Checking
You have to pass `npm run check` before submitting a pull request.
```bash
npm run check
```
The command includes all of the following checks:

## Building
```
npm run build
```
