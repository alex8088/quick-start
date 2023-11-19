#!/usr/bin/env zx
import 'zx/globals'

const playgroundDir = path.resolve(__dirname, '../playground')
const bin = path.posix.relative('../playground/', '../index.js')

if (!fs.existsSync(playgroundDir)) fs.mkdirSync(playgroundDir)

cd(playgroundDir)

await $`node ${bin} docs --skip`
await $`node ${bin} docs-ts --ts --skip`
await $`node ${bin} docs-i18n --i18n --skip`
await $`node ${bin} docs-i18n-ts --ts --i18n --skip`
await $`node ${bin} docs-zh --locale zh --skip`
await $`node ${bin} docs-zh-ts --ts --locale zh --skip`
