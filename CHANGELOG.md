# create-wagmi

## 0.1.6

### Patch Changes

- b544457: Updated `connectkit` to `1.1.0` in the ConnectKit templates

## 0.1.5

### Patch Changes

- 6bd6c74: Updated repo link in package.json

## 0.1.4

### Patch Changes

- c39666b: Added ability to select providers
- 37708ed: **Added ability to select frameworks.**

  Each directory in `templates/` now mirrors a "framework", where its child directories mirror a "template" for that framework.

  Example:

  ```
  templates/
    next/
      connectkit/
      default/
      rainbowkit/
      web3modal
    vite-react/
      connectkit/
      default/
      rainbowkit/
      web3modal/
  ```

- 399d2b9: Moved template configuration to the template level + added hooks

## 0.1.3

### Patch Changes

- 353332a: Added Web3Modal template
- dd95b14: **next-with-connectkit**: Update `connectkit` to `^1.0.0`

## 0.1.2

### Patch Changes

- 34f666b: Fixed issue where package manager install process would not log error

## 0.1.1

### Patch Changes

- 900cbdc: Updated `@rainbow-me/rainbowkit` dependency in Next + RainbowKit template

## 0.1.0

### Minor Changes

- 23993d2: ## 🎉 Initial release 🎉

  Get up and running quickly with wagmi by using the `create-wagmi` CLI. This tool interactively scaffolds a new wagmi project for you so you can start building instantly without the hassle of setting up `git`, installing packages, worrying about TypeScript configuration, etc.

  To get started, `create-wagmi` can be instantiated with one of your favorite package managers:

  ```bash
  npm init wagmi
  # or
  pnpm create wagmi
  # or
  yarn create wagmi
  ```
