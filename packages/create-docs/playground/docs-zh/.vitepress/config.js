import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

/**
 * @type {import('vitepress').DefaultTheme.Sidebar}
 */
const sidebar = {
  '/': [
    {
      text: '指南',
      items: [{ text: '快速开始', link: '/guide/' }]
    },
    {
      text: '示例',
      items: [
        { text: 'Markdown 拓展', link: '/guide/markdown' },
        { text: '资源处理 ', link: '/guide/asset-handling' }
      ]
    }
  ]
}

/**
 * @type {import('vitepress').DefaultTheme.NavItem[]}
 */
const nav = [
  { text: '指南', link: '/guide/', activeMatch: '^/guide/' },
  {
    text: '链接',
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
  lang: 'zh-CN',
  title: 'create-docs',
  description: '基于 VitePress 快速生成静态站点。',
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png ' }]
  ],
  srcDir: 'docs',
  lastUpdated: true,
  cleanUrls: true,
  // locales: {
  //   root: { label: '简体中文' },
  //   en: { label: 'English', link: 'https://example.com/' }
  // },
  themeConfig: {
    logo: '/logo.svg',
    outline: {
      label: '本页目录'
    },
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '最后更新时间',
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    // search: {
    //   provider: 'local',
    //   options: {
    //     translations: {
    //       button: {
    //         buttonText: '搜索',
    //         buttonAriaLabel: '搜索'
    //       },
    //       modal: {
    //         noResultsText: '无法找到相关结果',
    //         displayDetails: '显示详情',
    //         resetButtonTitle: '清除查询条件',
    //         footer: {
    //           selectText: '选择',
    //           navigateText: '切换',
    //           closeText: '关闭'
    //         }
    //       }
    //     }
    //   }
    // },
    // search: {
    //   provider: 'algolia',
    //   options: {
    //     appId: '...',
    //     apiKey: '...',
    //     indexName: '...',
    //     placeholder: '搜索文档',
    //     translations: {
    //       button: {
    //         buttonText: '搜索',
    //         buttonAriaLabel: '搜索'
    //       },
    //       modal: {
    //         searchBox: {
    //           resetButtonTitle: '清除查询条件',
    //           resetButtonAriaLabel: '清除查询条件',
    //           cancelButtonText: '取消',
    //           cancelButtonAriaLabel: '取消'
    //         },
    //         startScreen: {
    //           recentSearchesTitle: '搜索历史',
    //           noRecentSearchesText: '没有搜索历史',
    //           saveRecentSearchButtonTitle: '保存到搜索历史',
    //           removeRecentSearchButtonTitle: '从搜索历史中移除',
    //           favoriteSearchesTitle: '收藏',
    //           removeFavoriteSearchButtonTitle: '从收藏中移除'
    //         },
    //         errorScreen: {
    //           titleText: '无法获取结果',
    //           helpText: '你可能需要检查你的网络连接'
    //         },
    //         footer: {
    //           selectText: '选择',
    //           navigateText: '切换',
    //           closeText: '关闭',
    //           searchByText: '搜索供应商'
    //         },
    //         noResultsScreen: {
    //           noResultsText: '无法找到相关结果',
    //           suggestedQueryText: '你可以尝试查询',
    //           reportMissingResultsText: '你认为这个查询应该有结果？',
    //           reportMissingResultsLinkText: '向我们反馈'
    //         }
    //       }
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
