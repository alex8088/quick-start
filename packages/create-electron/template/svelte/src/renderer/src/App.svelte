<script>
  import icons from './assets/icons.svg'
  import Versions from './components/Versions.svelte'
</script>

<div class="container">
  <Versions />
  <svg viewBox="0 0 900 300">
    <use xlink:href={`${icons}#electron`} />
  </svg>
  <h2>You've successfully created an Electron project with Svelte</h2>

  <p class="desc">Please try pressing <code>F12</code> to open the devTool</p>

  <p class="desc">
    What features are being added to the project to help you develop, build and pack Electron app
  </p>

  <div class="features">
    <ul>
      <li>
        <p>
          ● Use
          <a target="_blank" href="https://eslint.org/docs/user-guide/getting-started">ESLint</a>
          and <a target="_blank" href="https://prettier.io">Prettier</a> to better lint and style
          your code, help you to write high-quality code.
        </p>
      </li>
      <li>
        <p>
          ● Use
          <a target="_blank" href="https://github.com/alex8088/electron-vite">electron-vite</a>
          , a fast build tooling integrated with
          <a target="_blank" href="https://vitejs.dev">Vite</a>, and you don't need to worry about
          configuration.
        </p>
      </li>
      <li>
        <p>
          ● Use
          <a target="_blank" href="https://github.com/alex8088/electron-toolkit"
            >electron-toolkit</a
          >
          that make you easy to develop. For example: TSconfigs extends, expose common Electron APIs
          to renderers in preload scripts and effective utils for the main process.
        </p>
      </li>
      <li>
        <p>
          ● Use <a target="_blank" href="https://www.electron.build">electron-builder</a> and preset
          common configuration, allows you to easily pack Electron app.
        </p>
      </li>
      <li>
        <p>● More instructions are available in README.md.</p>
      </li>
    </ul>
  </div>

  <p class="footer">
    See
    <a
      target="_blank"
      href="https://github.com/alex8088/quick-start/blob/master/packages/create-electron"
      >create-electron</a
    >
    for more details on each supported template:
    <br />
    <code>vanilla</code>, <code>vanilla-ts</code>, <code>vue</code>, <code>vue-ts</code>,
    <code>react</code>, <code>react-ts</code>, <code>svelte</code>, <code>svelte-ts</code>
  </p>
</div>


<style>
  :global(body) {
    display: flex;
    flex-direction: column;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Open Sans', sans-serif;
    color: #86a5b1;
    background-color: #2f3241;
    line-height: 1.5;
  }

  :global(*) {
    padding: 0;
    margin: 0;
  }

  ul {
    list-style: none;
  }

  code {
    font-weight: 600;
    padding: 4px 5px;
    border-radius: 2px;
    background-color: #26282e;
    font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    font-size: 85%;
  }

  a {
    color: #9feaf9;
    font-weight: 600;
    padding: 0 5px;
    border-radius: 2px;
    cursor: pointer;
    text-decoration: none;
    outline: none;
  }

  a:hover {
    background-color: #26282e;
  }

  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 15px 30px;
  }

  h2 {
    text-align: center;
    margin-bottom: 10px;
    margin-top: -1.4rem;
    font-weight: 400;
    color: #c2f5ff;
  }

  .desc {
    text-align: center;
    margin-bottom: 10px;
  }

  .features {
    background-color: rgba(194, 245, 255, 0.1);
    box-sizing: border-box;
    border-radius: 3px;
    padding: 8px;
    user-select: none;
  }

  .footer {
    text-align: center;
    margin-top: 10px;
  }
</style>
