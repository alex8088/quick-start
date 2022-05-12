import { DefaultTheme } from 'vitepress'

const guideSidebar: DefaultTheme.SideBarConfig = [
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

const sidebar: DefaultTheme.MultiSideBarConfig = {
  '/guide': guideSidebar
}

export default sidebar
