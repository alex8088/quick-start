#!/usr/bin/env zx
import 'zx/globals'

const playgroundDir = path.resolve(__dirname, '../playground')
const bin = path.posix.relative('../playground/', '../index.js')

if (!fs.existsSync(playgroundDir)) fs.mkdirSync(playgroundDir)

cd(playgroundDir)

await $`node ${bin} tsup --bundler tsup --skip`
await $`node ${bin} tsup-with-config --bundler tsup --useConfigFile --skip`
await $`node ${bin} tsup-vitest --bundler tsup --test --skip`
await $`node ${bin} tsup-tsx --bundler tsup --runTS --skip`
await $`node ${bin} unbuild --bundler unbuild --skip`
await $`node ${bin} unbuild-with-config --bundler unbuild --useConfigFile --skip`
await $`node ${bin} unbuild-vitest --bundler unbuild --test --skip`
await $`node ${bin} unbuild-tsx --bundler unbuild --runTS --skip`
await $`node ${bin} rollup --bundler rollup --skip`
await $`node ${bin} rollup-vitest --bundler rollup --test --skip`
await $`node ${bin} rollup-tsx --bundler rollup --runTS --skip`
