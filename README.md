# iLampa

This template should help get you started developing with Vue 3 in Vite.

## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn run dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
yarn run build

# Runs the end-to-end tests
yarn run test:e2e
# Runs the tests only on Chromium
yarn run test:e2e -- --project=chromium
# Runs the tests of a specific file
yarn run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
yarn run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn run lint
```
