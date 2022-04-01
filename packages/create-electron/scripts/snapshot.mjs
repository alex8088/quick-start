#!/usr/bin/env zx
import 'zx/globals'

const templates = [
  'sample',
  'sample-ts',
  'vue',
  'vue-ts',
  'react',
  'react-ts',
  'svelte',
  'svelte-ts'
]

const playgroundDir = path.resolve(__dirname, '../playground')
const bin = path.posix.relative('../playground/', '../index.js')

if (!fs.existsSync(playgroundDir)) fs.mkdirSync(playgroundDir)

cd(playgroundDir)

for (const template of templates) {
  await $`node ${bin} ${template} --template ${template} --skip`
}
