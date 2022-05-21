#!/usr/bin/env zx
import 'zx/globals'

const playgroundDir = path.resolve(__dirname, '../playground')
const bin = path.posix.relative('../playground/', '../index.js')

if (!fs.existsSync(playgroundDir)) fs.mkdirSync(playgroundDir)

cd(playgroundDir)

await $`node ${bin} docs --skip`
await $`node ${bin} docs-ts --ts --skip`
await $`node ${bin} docs-vue --theme vue --skip`
await $`node ${bin} docs-vue-ts --theme vue --ts --skip`
