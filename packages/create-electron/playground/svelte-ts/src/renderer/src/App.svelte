<script lang="ts">
  import icons from './assets/icons.svg'
  import Versions from './components/Versions.svelte'
</script>

<div class="container">
  <Versions />

  <svg class="hero-logo" viewBox="0 0 900 300">
    <use xlink:href={`${icons}#electron`} />
  </svg>
  <h2 class="hero-text">
    You've successfully created an Electron project with Svelte and TypeScript
  </h2>
  <p class="hero-tagline">Please try pressing <code>F12</code> to open the devTool</p>

  <div class="links">
    <div class="link-item">
      <a rel="noopener noreferrer" target="_blank" href="https://electron-vite.org">Documentation</a
      >
    </div>
    <div class="link-item link-dot">•</div>
    <div class="link-item">
      <a rel="noopener noreferrer" target="_blank" href="https://github.com/alex8088/electron-vite"
        >Getting Help</a
      >
    </div>
    <div class="link-item link-dot">•</div>
    <div class="link-item">
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://github.com/alex8088/quick-start/tree/master/packages/create-electron"
      >
        create-electron
      </a>
    </div>
  </div>

  <div class="features">
    <div class="feature-item">
      <article>
        <h2 class="title">Configuring</h2>
        <p class="detail">
          Config with <span>electron.vite.config.ts</span> and refer to the
          <a rel="noopener noreferrer" target="_blank" href="https://electron-vite.org/config"
            >config guide</a
          >.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">HMR</h2>
        <p class="detail">
          Edit <span>src/renderer</span> files to test HMR. See
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://electron-vite.org/guide/hmr.html">docs</a
          >.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Hot Reloading</h2>
        <p class="detail">
          Run <span>'electron-vite dev --watch'</span> to enable. See
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://electron-vite.org/guide/hot-reloading.html">docs</a
          >.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Debugging</h2>
        <p class="detail">
          Check out <span>.vscode/launch.json</span>. See
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://electron-vite.org/guide/debugging.html">docs</a
          >.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Source Code Protection</h2>
        <p class="detail">
          Supported via built-in plugin <span>bytecodePlugin</span>. See
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://electron-vite.org/guide/source-code-protection.html"
          >
            docs
          </a>
          .
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Packaging</h2>
        <p class="detail">
          Use
          <a rel="noopener noreferrer" target="_blank" href="https://www.electron.build"
            >electron-builder</a
          >
          and pre-configured to pack your app.
        </p>
      </article>
    </div>
  </div>
</div>

<style>
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 840px;
    margin: 0 auto;
    padding: 15px 30px 0 30px;
  }

  .hero-logo {
    margin-top: -0.4rem;
    transition: all 0.3s;
  }

  @media (max-width: 840px) {
    .hero-logo {
      margin-top: -1.5rem;
    }
  }

  .hero-text {
    font-weight: 400;
    color: #c2f5ff;
    text-align: center;
    margin-top: -0.5rem;
    margin-bottom: 10px;
  }

  @media (max-width: 660px) {
    .hero-logo {
      display: none;
    }

    .hero-text {
      margin-top: 20px;
    }
  }

  .hero-tagline {
    text-align: center;
    margin-bottom: 14px;
  }

  .links {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
    font-size: 18px;
    font-weight: 500;
  }

  .links a {
    font-weight: 500;
  }

  .links .link-item {
    padding: 0 4px;
  }

  .features {
    display: flex;
    flex-wrap: wrap;
    margin: -6px;
  }

  .features .feature-item {
    width: 33.33%;
    box-sizing: border-box;
    padding: 6px;
  }

  .features article {
    background-color: rgba(194, 245, 255, 0.1);
    border-radius: 8px;
    box-sizing: border-box;
    padding: 12px;
    height: 100%;
  }

  .features span {
    color: #d4e8ef;
    word-break: break-all;
  }

  .features .title {
    font-size: 17px;
    font-weight: 500;
    color: #c2f5ff;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .features .detail {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    margin-top: 6px;
  }

  @media (max-width: 660px) {
    .features .feature-item {
      width: 50%;
    }
  }

  @media (max-width: 480px) {
    .links {
      flex-direction: column;
      line-height: 32px;
    }

    .links .link-dot {
      display: none;
    }

    .features .feature-item {
      width: 100%;
    }
  }
</style>
