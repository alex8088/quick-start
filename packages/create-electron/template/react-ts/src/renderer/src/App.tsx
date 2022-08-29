import Versions from './components/Versions'
import icons from './assets/icons.svg'

function App(): JSX.Element {
  return (
    <div className="container">
      <Versions></Versions>
      <svg viewBox="0 0 900 300">
        <use xlinkHref={`${icons}#electron`} />
      </svg>
      <h2>You{"'"}ve successfully created an Electron project with React and TypeScript</h2>
      <p className="desc">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <p className="desc">
        What features are being added to the project to help you develop, build and pack Electron
        app
      </p>
      <div className="features">
        <ul>
          <li>
            <p>
              ● Use
              <a
                target="_blank"
                href="https://eslint.org/docs/user-guide/getting-started"
                rel="noopener noreferrer"
              >
                ESLint
              </a>
              and
              <a target="_blank" href="https://prettier.io" rel="noopener noreferrer">
                Prettier
              </a>
              to better lint and style your code, help you to write high-quality code.
            </p>
          </li>
          <li>
            <p>
              ● Use
              <a
                target="_blank"
                href="https://github.com/alex8088/electron-vite"
                rel="noopener noreferrer"
              >
                electron-vite
              </a>
              , a fast build tooling integrated with
              <a target="_blank" href="https://vitejs.dev" rel="noopener noreferrer">
                Vite
              </a>
              , and you don{"'"}t need to worry about configuration.
            </p>
          </li>
          <li>
            <p>
              ● Use
              <a
                target="_blank"
                href="https://github.com/alex8088/electron-toolkit"
                rel="noopener noreferrer"
              >
                electron-toolkit
              </a>
              that make you easy to develop. For example: TSconfigs extends, expose common Electron
              APIs to renderers in preload scripts and effective utils for the main process.
            </p>
          </li>
          <li>
            <p>
              ● Use
              <a target="_blank" href="https://www.electron.build" rel="noopener noreferrer">
                electron-builder
              </a>
              and preset common configuration, allows you to easily pack Electron app.
            </p>
          </li>
          <li>
            <p>● More instructions are available in README.md.</p>
          </li>
        </ul>
      </div>
      <p className="footer">
        See
        <a
          target="_blank"
          href="https://github.com/alex8088/quick-start/blob/master/packages/create-electron"
          rel="noopener noreferrer"
        >
          create-electron
        </a>
        for more details on each supported template:
        <br />
        <code>vanilla</code>, <code>vanilla-ts</code>, <code>vue</code>, <code>vue-ts</code>,
        <code>react</code>, <code>react-ts</code>, <code>svelte</code>, <code>svelte-ts</code>
      </p>
    </div>
  )
}

export default App
