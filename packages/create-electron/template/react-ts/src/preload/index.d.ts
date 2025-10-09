import { ElectronAPI } from '@electron-toolkit/preload'
import type { api } from './index'
declare global {
  interface Window {
    electron: ElectronAPI
    api: api
  }
}
