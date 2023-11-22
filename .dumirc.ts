import { defineConfig } from 'dumi';
import { homepage } from './package.json';

export default defineConfig({
  themeConfig: {
    name: '@ant-design/pro-chat',
    github: homepage,
    siteToken: {
      demoInheritSiteTheme: true,
    },
  },
  mfsu: false,
  outputPath: 'docs-dist',
  html2sketch: {},
  extraBabelPlugins: ['antd-style'],
});
