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

## 简介

ProChat 是基于 AntDesgin 5.0 基础上构建的企业级对话组件库，目的是帮助大家构建大模型对话场景下所需要的内容。

- 📦 **AI Friendly 的数据结构**：参照 ChatGPT、GLM、通义千问等市面上主流的大模型入参出参，减少前端开发者对这些入参和出参的处理。
- 🏗️ **大模型对话基本操作**：内置对话模型常用的：数据编辑、重新发送、删除对话等这些默认的基本操作。
- 📖 **更多自定义能力**：你可以通过透出的 Ref 进行颗粒度更细的对话内容处理
- 🚀 **更简单的样式**：和 antd 一脉相承，主打一个风格统一，你可以在上层自己定义样式。

## 快速上手

### 安装

推荐使用 `pnpm` 安装

```bash
pnpm i @ant-design/pro-chat -S
pnpm i @ant-design/antd-style -S
```

### 使用

```jsx
<ProChat
  request={async (messages) => {
    // Request 发送，Mesaage 作为 参数传入
    return Message; // 支持流式 & 非流式
  }}
/>
```

### 适配 NextJS

为适配 nextjs 的 SSR 模式, 需要将本包添加到 `next.config.js` 的 `transpilePackages` 配置中:

```js
// next.config.js
const nextConfig = {
  // ...other config
  transpilePackages: ['@ant-design/pro-chat'],
};
```

## 🤝 Contributing

<!-- CONTRIBUTION GROUP -->

> 📊 Total: <kbd>**4**</kbd>

<a href="https://github.com/arvinxx" title="arvinxx">
  <img src="https://avatars.githubusercontent.com/u/28616219?v=4" width="50" />
</a>
<a href="https://github.com/chenshuai2144" title="chenshuai2144">
  <img src="https://avatars.githubusercontent.com/u/8186664?v=4" width="50" />
</a>
<a href="https://github.com/ONLY-yours" title="ONLY-yours">
  <img src="https://avatars.githubusercontent.com/u/52664827?v=4" width="50" />
</a>
<a href="https://github.com/actions-user" title="actions-user">
  <img src="https://avatars.githubusercontent.com/u/65916846?v=4" width="50" />
</a>

<!-- CONTRIBUTION END -->

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
