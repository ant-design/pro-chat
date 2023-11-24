<a name="readme-top"></a>

<div align="center">

[//]: # '<img width="160" src="https://avatars.githubusercontent.com/u/17870709?v=4">'

<h1>@ant-design/pro-chat</h1>

一个开发 npm 项目的模板

[Changelog](./CHANGELOG.md) · [Report Bug][issues-url] · [Request Feature][issues-url]

<!-- SHIELD GROUP -->

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url] [![install size][npm-size]][npm-size-url]

[![Test CI status][test-ci]][test-ci-url] [![Deploy CI][release-ci]][release-ci-url] [![Coverage][coverage]][codecov-url]

[![contributors][contributors-shield]][contributors-url] [![forks][forks-shield]][forks-url] [![stargazers][stargazers-shield]][stargazers-url] [![issues][issues-shield]][issues-url]

[![ docs by dumi][dumi-url]](https://d.umijs.org/) [![Build With father][father-url]](https://github.com/umijs/father/)

![](https://github.com/othneildrew/Best-README-Template/raw/master/images/screenshot.png)

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

这是一个开发 npm 项目的模板，具有以下特点：

- 🏗️ **基于 father4 的构建工具**：本项目采用了基于 father4 的构建工具，可以更高效地构建项目，提高开发效率；
- 📖 **基于 dumi2 的文档工具**：本项目采用了基于 dumi2 的文档工具，可以更方便地编写和管理文档，提高文档的可读性和可维护性；
- 🚀 **基于 vercel 自动化触发文档站构建**：本项目使用 vercel 自动化触发文档站构建，可以更快地更新文档站，提高用户的使用体验；
- 📦 **基于 semantic-release 实现 npm 包的自动化发布**：本项目使用 semantic-release 实现 npm 包的自动化发布，可以更方便地管理和发布 npm 包，提高开发效率。

## 快速上手

### 安装

推荐使用 `pnpm` 安装

```bash
pnpm i @ant-design/pro-chat -S
```

### 使用

基于该仓库模板可以快速创建一个 npm 包的工程化脚手架。

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

> 📊 Total: <kbd>**2**</kbd>

<a href="https://github.com/arvinxx" title="arvinxx">
  <img src="https://avatars.githubusercontent.com/u/28616219?v=4" width="50" />
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
