import { type Component, createSignal } from 'solid-js'

const Versions: Component = () => {
  const [versions] = createSignal(window.electron.process.versions)

  return (
    <ul class="versions">
      <li class="electron-version">Electron v{versions().electron}</li>
      <li class="chrome-version">Chromium v{versions().chrome}</li>
      <li class="node-version">Node v{versions().node}</li>
    </ul>
  )
}

export default Versions
