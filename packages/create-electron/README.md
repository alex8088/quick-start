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

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold an Electrn + Vue project, run:

```bash
# npm 6.x
npm create @quick-start/electron my-app --template vue

# npm 7+, extra double-dash is needed:
npm create @quick-start/electron my-app -- --template vue

# yarn
yarn create @quick-start/electron my-app --template vue
```

Currently supported template presets include:

- `vanilla`
- `vanilla-ts`
- `vue`
- `vue-ts`
- `react`
- `react-ts`
- `svelte`
- `svelte-ts`

## Features

- Use `ESLint + Prettier` to better lint and style your code, help you to write high-quality code.
- Use [electron-vite](https://github.com/alex8088/electron-vite) compiler, a fast javascript builder integrated with [Vite](https://vitejs.dev), and you don't need to care about configuration.
- Use [electron-toolkit](https://github.com/alex8088/electron-toolkit) that make you easy to develop. For example: TSconfigs extends, expose common Electron APIs to renderer process in preload scripts and effective utils for main process.
- Use [electron-builder](https://www.electron.build) and preset common configuration, allows you to easily pack Electron app.
- Use [electron-updater](https://www.electron.build) for auto-update, based on electron-builder.
