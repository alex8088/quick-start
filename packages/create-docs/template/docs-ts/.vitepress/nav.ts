import { DefaultTheme } from 'vitepress'

const nav: DefaultTheme.NavItem[] = [
  { text: 'Guide', link: '/guide/getting-started', activeMatch: '^/guide/' },
  {
    text: 'VitePress',
    link: 'https://vitepress.vuejs.org/'
  }
]

export default nav
