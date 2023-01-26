# `create-wagmi`

Get up and running quickly with wagmi by using the `create-wagmi` CLI. This tool interactively scaffolds a new wagmi project for you so you can start building instantly without the hassle of setting up `git`, installing packages, worrying about TypeScript configuration, etc.

To get started, `create-wagmi` can be instantiated with one of your favorite package managers:

```bash
npm init wagmi
# or
pnpm create wagmi
# or
yarn create wagmi
```

## Templates

By default, `create-wagmi` scaffolds a basic Next.js application with wagmi. However, you can specify a custom template by passing the `--template`/`-t` flag:

```bash
npm init wagmi -- --template next-connectkit
# or
pnpm create wagmi --template next-connectkit
# or
yarn create wagmi --template next-connectkit
```

`create-wagmi` currently comes with the following templates:

- `next` (default): A Next.js wagmi project.
- `next-cli-abi`: A Next.js wagmi project with `@wagmi/cli` set up
- `next-cli-erc`: A Next.js wagmi project with`@wagmi/cli` ERC Plugin set up
- `next-cli-etherscan`: A Next.js wagmi project with `@wagmi/cli` Etherscan Plugin set up
- `next-cli-foundry`: A Next.js wagmi project with `@wagmi/cli` Foundry Plugin set up
- `next-connectkit`: A Next.js wagmi project with ConnectKit included.
- `next-rainbowkit`: A Next.js wagmi project with RainbowKit included.
- `next-web3modal`: A Next.js wagmi project with Web3Modal included.
- `vite-react`: A Vite (React) wagmi project.
- `vite-react-cli-abi`: A Next.js wagmi project with `@wagmi/cli` set up
- `vite-react-cli-erc`: A Next.js wagmi project with `@wagmi/cli` ERC Plugin set up
- `vite-react-cli-etherscan`: A Next.js wagmi project with `@wagmi/cli` Etherscan Plugin set up
- `vite-react-cli-foundry`: A Next.js wagmi project with `@wagmi/cli` Foundry Plugin set up
- `vite-react-connectkit`: A Vite (React) wagmi project with ConnectKit included.
- `vite-react-rainbowkit`: A Vite (React) wagmi project with RainbowKit included.
- `vite-react-web3modal`: A Vite (React) wagmi project with Web3Modal included.

## Options

### --template/-t

Specify a [custom template](#templates) to bootstrap the app with.

### --npm

Use npm as the package manager for the app.

### --pnpm

Use pnpm as the package manager for the app.

### --yarn

Use yarn as the package manager for the app.

### --skip-git

Skips initializing the project as a git repository
