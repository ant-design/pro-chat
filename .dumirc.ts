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
    features: [
      {
        image:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/q48YQ5X4ytAAAAAAAAAAAAAAFl94AQBr',
        title: '简单易用',
        description: '在 Ant Design 上进行了自己的封装，更加易用',
      },
      {
        image: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        title: 'Ant Design',
        description: '与 Ant Design 设计体系一脉相承，无缝对接 antd 项目',
      },
      {
        image:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/UKqDTIp55HYAAAAAAAAAAAAAFl94AQBr',
        title: '大模型对话组件',
        description: '内置对话模型常用的：数据编辑、重新发送、删除对话等这些默认的基本操作',
      },

      {
        image:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/Y_NMQKxw7OgAAAAAAAAAAAAAFl94AQBr',
        title: '预设样式',
        description: '样式风格与 antd 一脉相承，无需魔改，浑然天成。默认好用的主题系统',
      },
      {
        image:
          'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/U3XjS5IA1tUAAAAAAAAAAAAAFl94AQBr',
        title: 'AI Friendly 的数据结构',
        description:
          '参照 ChatGPT、GLM、通义千问等市面上主流的大模型入参出参，减少前端开发者对这些入参和出参的处理',
      },

      {
        image: 'https://gw.alipayobjects.com/zos/antfincdn/Eb8IHpb9jE/Typescript_logo_2020.svg',
        title: 'TypeScript',
        description: '使用 TypeScript 开发，提供完整的类型定义文件，无需频繁打开官网',
      },
    ],
    logo: 'https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*Mo27Sr3kS4kAAAAAAAAAAAAADmuEAQ/original',
    hero: {
      'zh-CN': {
        title: 'ProEditor',
        description: '🌟 通用编辑器 UI 框架',
        actions: [
          {
            text: '快速开始 →',
            link: '/guide/intro-start',
          },
          {
            text: 'Github',
            link: 'https://github.com/ant-design/pro-chat',
          },
        ],
      },
      'en-US': {
        title: 'ProEditor',
        description: '🌟 A General Editor UI Framework',
        actions: [
          {
            text: 'Quick Start →',
            link: '/guide/intro-start',
          },
        ],
      },
    },
  },
  mfsu: false,
  outputPath: 'docs-dist',
  html2sketch: {},
  extraBabelPlugins: ['antd-style'],
});
