import { defineConfig } from 'dumi';
import { homepage } from './package.json';

export default defineConfig({
  favicons: [
    'https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*Mo27Sr3kS4kAAAAAAAAAAAAADmuEAQ/original',
  ],
  themeConfig: {
    name: '@ant-design/pro-chat',
    github: homepage,
    socialLinks: {
      github: 'https://github.com/ant-design/pro-chat',
    },
    footer: 'Made with ❤️ by 蚂蚁集团 - AFX & 数字科技',
    logo: 'https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*Mo27Sr3kS4kAAAAAAAAAAAAADmuEAQ/original',
  },
  title: '@ant-design/pro-chat',
  resolve: {
    docDirs: ['docs'],
    atomDirs: [{ type: 'component', dir: 'src/components' }],
  },
  outputPath: 'docs-dist',
  html2sketch: {},
  extraBabelPlugins: ['antd-style'],
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'EN' },
  ],
});
