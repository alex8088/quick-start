import { createRequire } from 'node:module'
import fs from 'node:fs/promises'
import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

function clean(when, target) {
  const _clean = async (target) => {
    await fs.rm(target, { recursive: true, force: true }).catch(() => {})
  }
  return {
    name: 'clean',
    buildStart: async () => {
      if (when !== 'buildStart') return
      await _clean(target)
    },
    buildEnd: async () => {
      if (when !== 'buildEnd') return
      await _clean(target)
    }
  }
}

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      clean('buildStart', 'dist'),
      resolve(),
      commonjs(),
      ts({ compilerOptions: { declaration: true, outDir: 'dist/types' } })
    ]
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts(), clean('buildEnd', 'dist/types')]
  }
])
