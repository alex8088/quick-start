<script lang="ts">
  const versions = window.electron.process.versions
</script>

<ul class="versions">
  <li class="electron-version">Electron v{versions.electron}</li>
  <li class="chrome-version">Chromium v{versions.chrome}</li>
  <li class="node-version">Node v{versions.node}</li>
  <li class="v8-version">V8 v{versions.v8}</li>
</ul>

<style>
  .versions {
    margin: 0 auto;
    float: none;
    clear: both;
    overflow: hidden;
    font-family: 'Menlo', 'Lucida Console', monospace;
    color: #c2f5ff;
    line-height: 1;
    transition: all 0.3s;
  }

  .versions li {
    display: block;
    float: left;
    border-right: 1px solid rgba(194, 245, 255, 0.4);
    padding: 0 20px;
    font-size: 13px;
    opacity: 0.8;
  }

  .versions li:last-child {
    border: none;
  }

  @media (max-width: 840px) {
    .versions {
      display: none;
    }
  }
</style>
