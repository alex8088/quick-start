module.exports = (packageName) => {
  return {
    config: {
      provider: 'generic',
      url: 'https://example.com/auto-updates',
      updaterCacheDirName: `${packageName}-updater`
    },
    dependencies: {
      'electron-updater': '^5.3.0'
    }
  }
}
