import { defineConfig } from 'vitepress'
import nav from './nav'
import sidebar from './sidebar'

export default defineConfig({
  lang: 'en-US',
  title: 'VitePress CLI',
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
