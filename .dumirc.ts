import { defineConfig } from 'dumi';
import { homepage } from './package.json';

export default defineConfig({
  themeConfig: {
    name: '@arvinxu/npm-template',
    github: homepage,
  },
  html2sketch: {},
});
