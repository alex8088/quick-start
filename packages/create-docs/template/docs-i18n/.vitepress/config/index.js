import { defineConfig } from 'vitepress'
import zh from './zh'

/**
 * @type {import('vitepress').DefaultTheme.Sidebar}
 */
const sidebar = {
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

/**
 * @type {import('vitepress').DefaultTheme.NavItem[]}
 */
const nav = [
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
  locales: {
    root: { label: 'English' },
    zh: { label: '简体中文', ...zh.localeConfig }
  },
  themeConfig: {
    logo: '/logo.svg',
    // search: {
    //   provider: 'local',
    //   options: {
    //     locales: {
    //       zh: zh.searchLocales.local
    //     }
    //   }
    // },
    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: '...',
    //     apiKey: '...',
    //     indexName: '...',
    //     locales: {
    //       zh: zh.searchLocales.algolia
    //     }
    //   }
    // },
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
  }
})
