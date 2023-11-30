#!/usr/bin/env zx
import 'zx/globals'

const playgroundDir = path.resolve(__dirname, '../playground')
const bin = path.posix.relative('../playground/', '../index.js')

if (!fs.existsSync(playgroundDir)) fs.mkdirSync(playgroundDir)

cd(playgroundDir)

await $`node ${bin} monorepo --skip`
await $`node ${bin} monorepo-test --test --skip`
await $`node ${bin} monorepo-tsx --runTS --skip`
