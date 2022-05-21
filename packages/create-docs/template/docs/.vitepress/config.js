import { defineConfig } from 'vitepress'

/**
 * @type {import('vitepress').DefaultTheme.SideBarConfig}
 */
const guideSidebar = [
  {
    text: 'Guide',
    children: [
      { text: 'Introduction', link: '/guide/introduction' },
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Theme', link: '/guide/theme' }
    ]
  },
  {
    text: 'Components',
    children: [
      { text: 'Button', link: '/guide/button-component' },
      { text: 'Link', link: '/guide/link-component' }
    ]
  }
]

/**
 * @type {import('vitepress').DefaultTheme.MultiSideBarConfig}
 */
const sidebar = {
  '/guide': guideSidebar
}

/**
 * @type {import('vitepress').DefaultTheme.NavItem[]}
 */
const nav = [
  { text: 'Guide', link: '/guide/getting-started', activeMatch: '^/guide/' },
  {
    text: 'VitePress',
    link: 'https://vitepress.vuejs.org/'
  }
]

export default defineConfig({
  lang: 'en-US',
  title: 'create-docs',
  description: 'Quickly generate a static site with VitePress.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]
  ],
  srcDir: 'docs',
  lastUpdated: true,
  themeConfig: {
    repo: 'alex8088/quick-start/tree/master/packages/create-docs',
    logo: './logo.png',
    nav,
    sidebar
  }
})
