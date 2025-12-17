import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    logo: '/logo.png',
    rtl: true,
    name: 'kwc',
    nav: {
      'zh-CN': [
        { title: '介绍', link: '/guide' },
        { title: '组件', link: '/components' },
      ],
      'en-US': [
        { title: 'Guide', link: '/en-US/guide' },
        { title: 'Components', link: '/en-US/components' },
      ],
    },
  },
  // 开启 i18n
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  mfsu: false,
  links: [
    {
      rel: 'icon',
      href: '/favicon.ico',
      type: 'image/x-icon',
    },
  ],
});
