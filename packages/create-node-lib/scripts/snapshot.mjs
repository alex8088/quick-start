#!/usr/bin/env zx
import 'zx/globals'

const playgroundDir = path.resolve(__dirname, '../playground')
const bin = path.posix.relative('../playground/', '../index.js')

if (!fs.existsSync(playgroundDir)) fs.mkdirSync(playgroundDir)

cd(playgroundDir)

await $`node ${bin} rollup --bundler rollup --skip`
await $`node ${bin} rollup-vitest --bundler rollup --test --skip`
await $`node ${bin} rollup-tsx --bundler rollup --runTS --skip`
await $`node ${bin} tsdown --bundler tsdown --skip`
await $`node ${bin} tsdown-vitest --bundler tsdown --test --skip`
await $`node ${bin} tsdown-tsx --bundler tsdown --runTS --skip`
