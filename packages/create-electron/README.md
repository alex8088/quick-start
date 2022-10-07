# create-electron

An easy way to start an Electron project

## Usage

> **Compatibility Note:**
> Some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

With npm:

```bash
$ npm create @quick-start/electron
```

With Yarn:

```bash
$ yarn create @quick-start/electron
```

With pnpm:

```bash
$ pnpm create @quick-start/electron
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold an Electron + Vue project, run:

```bash
# npm 6.x
npm create @quick-start/electron my-app --template vue

# npm 7+, extra double-dash is needed:
npm create @quick-start/electron my-app -- --template vue

# yarn
yarn create @quick-start/electron my-app --template vue

# pnpm
pnpm create @quick-start/electron my-app --template vue
```

Currently supported template presets include:

|          JavaScript           |              TypeScript             |
| :---------------------------: | :---------------------------------: |
| [vanilla](playground/vanilla) | [vanilla-ts](playground/vanilla-ts) |
|     [vue](playground/vue)     |     [vue-ts](playground/vue-ts)     |
|   [react](playground/react)   |   [react-ts](playground/react-ts)   |
|  [svelte](playground/svelte)  |  [svelte-ts](playground/svelte-ts)  |
|   [solid](playground/solid)   |  [solid-ts](playground/solid-ts)    |

## Features

- Use `ESLint + Prettier` to better lint and style your code, help you to write high-quality code.
- Use [electron-vite](https://github.com/alex8088/electron-vite), a fast build tooling integrated with [Vite 3](https://vitejs.dev), support for `HMR`, `hot reloading`, `debugging` and `source code protection`.
- Use [electron-toolkit](https://github.com/alex8088/electron-toolkit) to help you develop. For example: TSconfig extends, easily expose Electron APIs to renderers in preload scripts, etc.
- Use [electron-builder](https://www.electron.build) and pre-configured to pack your app.
- Use [electron-updater](https://www.electron.build) for auto-update, based on electron-builder.
