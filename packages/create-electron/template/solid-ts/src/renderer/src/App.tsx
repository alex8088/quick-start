import type { Component } from 'solid-js'
import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'

const App: Component = () => {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <img alt="logo" class="logo" src={electronLogo} />
      <div class="creator">Powered by electron-vite</div>
      <div class="text">
        Build an Electron app with <span class="solid">Solid</span>
        &nbsp;and <span class="ts">TypeScript</span>
      </div>
      <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
      <div class="actions">
        <div class="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
        </div>
        <div class="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>Send IPC</a>
        </div>
      </div>
      <Versions />
    </>
  )
}

export default App
