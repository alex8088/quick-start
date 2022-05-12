/**
 * @type {import('vitepress').DefaultTheme.SideBarConfig}
 */
const guideSidebar = [
  {
    text: 'Guide',
    children: [
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Configuration', link: '/guide/configuration' },
      { text: 'Theme', link: '/guide/theme' },
      { text: 'Components', link: '/guide/components' }
    ]
  }
]

/**
 * @type {import('vitepress').DefaultTheme.MultiSideBarConfig}
 */
const sidebar = {
  '/guide': guideSidebar
}

export default sidebar
