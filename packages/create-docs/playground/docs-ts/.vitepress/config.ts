import { defineConfig, DefaultTheme } from 'vitepress'

const guideSidebar: DefaultTheme.SideBarConfig = [
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

const sidebar: DefaultTheme.MultiSideBarConfig = {
  '/guide': guideSidebar
}

const nav: DefaultTheme.NavItem[] = [
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
