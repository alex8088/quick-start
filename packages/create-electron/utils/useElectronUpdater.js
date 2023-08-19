module.exports = (packageName) => {
  return {
    config: {
      provider: 'generic',
      url: 'https://example.com/auto-updates',
      updaterCacheDirName: `${packageName}-updater`
    },
    dependencies: {
      'electron-updater': '^6.1.1'
    }
  }
}
