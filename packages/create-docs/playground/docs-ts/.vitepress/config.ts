import { defineConfig, DefaultTheme } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

const sidebar: DefaultTheme.Sidebar = {
  '/': [
    {
      text: 'Guide',
      items: [{ text: 'Getting Started', link: '/guide/' }]
    },
    {
      text: 'Examples',
      items: [
        { text: 'Markdown Extensions', link: '/guide/markdown' },
        { text: 'Asset Handling ', link: '/guide/asset-handling' }
      ]
    }
  ]
}

const nav: DefaultTheme.NavItem[] = [
  { text: 'Guide', link: '/guide/', activeMatch: '^/guide/' },
  {
    text: 'Links',
    items: [
      { text: 'VitePress', link: 'https://vitepress.dev/' },
      {
        text: 'create-docs',
        link: 'https://github.com/alex8088/quick-start/tree/master/packages/create-docs'
      }
    ]
  }
]

export default defineConfig({
  lang: 'en-US',
  title: 'create-docs',
  description: 'Quickly generate a static site with VitePress.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png ' }]
  ],
  srcDir: 'docs',
  lastUpdated: true,
  cleanUrls: true,
  // locales: {
  //   root: { label: 'English' },
  //   zh: { label: '简体中文', link: 'https://example.com/' }
  // },
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/alex8088/quick-start/tree/master/packages/create-docs'
      }
    ],
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2022-present Alex Wei and Powered by VitePress'
    },
    nav,
    sidebar
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    }
  },
  vite: {
    plugins: [
      groupIconVitePlugin()
    ]
  }
})
