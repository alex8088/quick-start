# Contributing

Thanks for being interested in contributing to this project!

## Repo Setup

Clone this repo to your local machine and install the dependencies.

```bash
pnpm install
```

**NOTE**: The package manager used to install and link dependencies must be pnpm.

## Project Structure

We use monorepo for multiple packages

```shell
└──packages
   ├──create-electron
   └──...
```

## Pull Request

- Checkout a topic branch from a base branch, e.g. master, and merge back against that branch.
- It's OK to have multiple small commits as you work on the PR - GitHub can automatically squash them before merging.
- Commit messages must follow the [commit message convention](./.github/commit-convention.md). Commit messages are automatically validated before commit (by invoking [Git Hooks](https://git-scm.com/docs/githooks) via [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)).
- No need to worry about code style as long as you have installed the dev dependencies - modified files are automatically formatted with Prettier on commit (by invoking [Git Hooks](https://git-scm.com/docs/githooks) via [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks)).
