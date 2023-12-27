<p align="center">
  <img width="160" src="https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*Mo27Sr3kS4kAAAAAAAAAAAAADmuEAQ/original">
</p>

[//]: # '<img width="160" src="https://avatars.githubusercontent.com/u/17870709?v=4">'

<div align="center">

<h1>@ant-design/pro-chat</h1>

一个快速搭建起大语言模型 Chat 对话的前端组件库

[Changelog](./CHANGELOG.md) · [Report Bug][issues-url] · [Request Feature][issues-url]

<!-- SHIELD GROUP -->

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] [![install size][npm-size]][npm-size-url]

[![Test CI status][test-ci]][test-ci-url] [![Deploy CI][release-ci]][release-ci-url] [![Coverage][coverage]][codecov-url]

[![contributors][contributors-shield]][contributors-url] [![forks][forks-shield]][forks-url] [![stargazers][stargazers-shield]][stargazers-url] [![issues][issues-shield]][issues-url]

[![ docs by dumi][dumi-url]](https://d.umijs.org/) [![Build With father][father-url]](https://github.com/umijs/father/)

<!-- gitpod url -->

[gitpod-badge]: https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod
[gitpod-url]: https://gitpod.io/#https://github.com/ant-design/@ant-design/pro-chat

<!-- umi url -->

[dumi-url]: https://img.shields.io/badge/docs%20by-dumi-blue
[father-url]: https://img.shields.io/badge/build%20with-father-028fe4.svg

<!-- npm url -->

[npm-image]: http://img.shields.io/npm/v/@ant-design/pro-chat.svg?style=flat-square&color=deepgreen&label=latest
[npm-url]: http://npmjs.org/package/@ant-design/pro-chat
[npm-size]: https://img.shields.io/bundlephobia/minzip/@ant-design/pro-chat?color=deepgreen&label=gizpped%20size&style=flat-square
[npm-size-url]: https://packagephobia.com/result?p=@ant-design/pro-chat

<!-- coverage -->

[coverage]: https://codecov.io/gh/ant-design/pro-chat/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/ant-design/pro-chat/branch/master

<!-- Github CI -->

[test-ci]: https://github.com/ant-design/pro-chat/workflows/Test%20CI/badge.svg
[release-ci]: https://github.com/ant-design/pro-chat/workflows/Release%20CI/badge.svg
[test-ci-url]: https://github.com/ant-design/pro-chat/actions?query=workflow%3ATest%20CI
[release-ci-url]: https://github.com/ant-design/pro-chat/actions?query=workflow%3ARelease%20CI
[download-image]: https://img.shields.io/npm/dm/@ant-design/pro-chat.svg?style=flat-square
[download-url]: https://npmjs.org/package/@ant-design/pro-chat

</div>

## ✨简介

ProChat 是基于 AntDesgin 5.0 基础上构建的企业级对话组件库，目的是帮助大家构建大模型对话场景下所需要的内容。

- 📦 **AI Friendly 的数据结构**：参照 ChatGPT、GLM、通义千问等市面上主流的大模型入参出参，减少前端开发者对这些入参和出参的处理。
- 🏗️ **大模型对话基本操作**：内置对话模型常用的：数据编辑、重新发送、删除对话等这些默认的基本操作。
- 📖 **更多自定义能力**：你可以通过透出的 Ref 进行颗粒度更细的对话内容处理
- 🚀 **更简单的样式**：和 antd 一脉相承，主打一个风格统一，你可以在上层自己定义样式。

## 快速上手

### 📦 安装

推荐使用 `pnpm` 安装

```bash
pnpm i @ant-design/pro-chat -S
pnpm i @ant-design/antd-style -S
```

依赖需求

```jsx
peerDependencies: {
  "antd": "^5",
  "antd-style": "^3",
  "react": "^18"
}
```

### 🔨 使用

```jsx
<ProChat
  request={async (messages) => {
    // Request 发送，Mesaage 作为 参数传入
    return Message; // 支持流式 & 非流式
  }}
/>
```

### 🍉 功能

- [x] 对话能力
  - [x] 自动缓存对话内容
  - [x] 支持非流式、流式对话
  - [x] 重新请求、编辑组合、删除能力
  - [x] 自动 Markdown 渲染
- [x] 预设 & Api
  - [x] 欢迎语👏(HelloMessage)
  - [x] 自定义 Loading
  - [x] 初始化聊天记录(initialChats)
  - [x] 语言模型角色设定
  - [x] 程序化控制(Ref)
- [ ] 设计 / 进行中
  - [ ] 带有编辑能力的对话自定义渲染 [issue/21](https://github.com/ant-design/pro-chat/issues/21)
  - [ ] 额外请求参数的塞入
  - [ ] 出错时候的自定义渲染/配置
  - [ ] 更完展的文档 & 国际化
  - [ ] 原子化组件设计 

### 🌟 Case

#### 流式对话

![stream](https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*0uQhSIzSS3YAAAAAAAAAAAAADmuEAQ/original)

#### 内置渲染器

![highlight](https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*e4JbQKfupVQAAAAAAAAAAAAADmuEAQ/original)

#### 内容编辑

![edit](https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*wVSCTb7bq8UAAAAAAAAAAAAADmuEAQ/original)

### 适配 NextJS

为适配 nextjs 的 SSR 模式, 需要将本包添加到 `next.config.js` 的 `transpilePackages` 配置中:

```js
// next.config.js
const nextConfig = {
  // ...other config
  transpilePackages: ['@ant-design/pro-chat'],
};
```

## 🖥 浏览器兼容性

- 现代浏览器
- [Electron](https://www.electronjs.org/)

| [![edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![electron_48x48](https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png)](http://godban.github.io/browsers-support-badges/) |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## ⌨️ 本地开发

你可以使用 Gitpod 进行在线开发：

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ant-design/pro-chat)

或者克隆到本地开发:

```bash
$ git clone git@github.com:ant-design/pro-chat.git
$ cd pro-chat
$ npm install
$ npm start
```

## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建 😃 ：

- 在你的公司或个人项目中使用 [ProChat](https://github.com/ant-design/pro-chat)，[ProEditor](https://github.com/ant-design/pro-editor)，[Ant Design](https://github.com/ant-design/ant-design) 和 [antd-style](https://github.com/ant-design/antd-style)。
- 通过 [Issue](https://github.com/ant-design/pro-chat/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](https://github.com/ant-design/pro-chat/pulls) 改进 ProChat 的代码。

## 🤝 Contributing

<!-- Copy-paste in your Readme.md file -->

<a href="https://next.ossinsight.io/widgets/official/compose-recent-top-contributors?repo_id=707504998" target="_blank" style="display: block" align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://next.ossinsight.io/widgets/official/compose-recent-top-contributors/thumbnail.png?repo_id=707504998&image_size=auto&color_scheme=dark" width="373" height="auto">
    <img alt="Top Contributors of ant-design/pro-chat - Last 28 days" src="https://next.ossinsight.io/widgets/official/compose-recent-top-contributors/thumbnail.png?repo_id=707504998&image_size=auto&color_scheme=light" width="373" height="auto">
  </picture>
</a>

<div align="right">

[![][back-to-top]](#readme-top)

## </div>

#### 📝 License

Copyright © 2020 - present [Arvin Xu][profile-url]. <br /> This project is [MIT](./LICENSE) licensed.

<!-- LINK GROUP -->

[profile-url]: https://github.com/arvinxx

<!-- SHIELD LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square

<!-- contributors -->

[contributors-shield]: https://img.shields.io/github/contributors/ant-design/pro-chat.svg?style=flat
[contributors-url]: https://github.com/ant-design/pro-chat/graphs/contributors

<!-- forks -->

[forks-shield]: https://img.shields.io/github/forks/ant-design/pro-chat.svg?style=flat
[forks-url]: https://github.com/ant-design/pro-chat/network/members

<!-- stargazers -->

[stargazers-shield]: https://img.shields.io/github/stars/ant-design/pro-chat.svg?style=flat
[stargazers-url]: https://github.com/ant-design/pro-chat/stargazers

<!-- issues -->

[issues-shield]: https://img.shields.io/github/issues/ant-design/pro-chat.svg?style=flat
[issues-url]: https://github.com/ant-design/pro-chat/issues/new/choose
