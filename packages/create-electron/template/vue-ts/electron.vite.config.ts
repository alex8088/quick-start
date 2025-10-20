import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

// 修复electron.d.ts的node引用导致前端代码错误存在nodejs类型定义
import * as fs from 'fs'
const electronDtsPath = 'node_modules/electron/electron.d.ts'
const electronDtsContent = fs.readFileSync(electronDtsPath, 'utf-8')
const fixedElectronDtsContent = electronDtsContent.replace('/// <reference types="node" />', '')
fs.writeFileSync(electronDtsPath, fixedElectronDtsContent)


export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [vue()]
  }
})
