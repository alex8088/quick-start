import { createRequire } from 'node:module'
import { defineConfig } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import rm from 'rollup-plugin-rm'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      rm('dist', 'buildStart'),
      resolve(),
      commonjs(),
      ts({
        compilerOptions: {
          rootDir: 'src',
          declaration: true,
          declarationDir: 'dist/types'
        }
      })
    ]
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts(), rm('dist/types', 'buildEnd')]
  }
])
