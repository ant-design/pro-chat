import { defineConfig } from 'dumi';
import { homepage } from './package.json';

export default defineConfig({
  themeConfig: {
    name: '@ant-design/pro-chat',
    github: homepage,
  },
  html2sketch: {},
});
