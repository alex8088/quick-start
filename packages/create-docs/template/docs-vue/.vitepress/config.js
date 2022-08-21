import { defineConfig } from 'vitepress'
import baseConfig from 'vitepress-theme-vue/config'

const guideGroupItems = [
  { text: 'Introduction', link: '/guide/introduction' },
  { text: 'Getting Started', link: '/guide/' },
  { text: 'Theme', link: '/guide/theme' }
]

const componentGroupItems = [
  { text: 'Button', link: '/guide/button-component' },
  { text: 'Link', link: '/guide/link-component' }
]

/**
 * @type {import('vitepress-theme-vue').SidebarGroup}
 */
const guideSidebar = [
  { text: 'Guide', items: guideGroupItems },
  { text: 'Components', items: componentGroupItems }
]

/**
 * @type {import('vitepress-theme-vue').MultiSidebarConfig}
 */
const sidebar = {
  '/guide': guideSidebar
}

/**
 * @type {import('vitepress-theme-vue').NavItem}
 */
const nav = [
  {
    text: 'Guide',
    items: [
      { text: 'Guide', items: guideGroupItems },
      { text: 'Components', items: componentGroupItems }
    ],
    activeMatch: `^/guide/`
  },
  {
    text: 'Help',
    items: [
      { text: 'vitepress', link: 'https://vitepress.vuejs.org/' },
      {
        text: 'vitepress-theme-vue',
        link: 'https://alex8088.github.io/vitepress-theme-vue/'
      }
    ]
  }
]

export default defineConfig({
  extends: baseConfig,
  lang: 'en-US',
  title: 'create-docs',
  description: 'Quickly generate a static site with VitePress.',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]
  ],
  srcDir: 'docs',
  lastUpdated: true,
  themeConfig: {
    navLogo: '/favicon.svg',
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/alex8088/quick-start/tree/master/packages/create-docs'
      }
    ],
    nav,
    sidebar
  }
})
