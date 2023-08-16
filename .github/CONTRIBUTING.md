# Contributing to Techor

## Developing
Split a new terminal and run `pnpm run dev` in the project root to watch all packages change and build:
```bash
pnpm run dev
```
Split a new terminal and switch to the target directory for testing to avoid running tests from other packages:
```bash
cd packages/target
```
```bash
pnpm run test -- --watch
```

## Testing
```bash
pnpm run test
```

## Linting
Follow the [Techor's ESLint Preset](https://github.com/1aron/techor/tree/beta/packages/eslint-config)
```bash
pnpm run lint
```

To automatically fix any violations in your code:
```
pnpm run lint -- --fix
```

## Type Checking
```bash
pnpm run type-check
```

## Commit Checking
Follow the [Techor's Conventional Commits](https://github.com/1aron/techor/tree/beta/packages/conventional-commits)
```bash
pnpm run commit-check
```

## Checking
You have to pass `pnpm run check` before submitting a pull request.
```bash
pnpm run check
```
The command includes all of the following checks:

## Building
```
pnpm run build
```
