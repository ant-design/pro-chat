<div align="center">

<img height="120" src="https://gw.alipayobjects.com/zos/kitchen/wzToJwlSw%24/logo.svg">
<img height="120" src="https://gw.alipayobjects.com/zos/kitchen/qJ3l3EPsdW/split.svg">
<img height="120" src="https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*Mo27Sr3kS4kAAAAAAAAAAAAADmuEAQ/original">

<h1>ProChat</h1>

一个快速搭建起大语言模型 Chat 对话的前端组件库

[![][npm-release-shield]][npm-release-link] [![][npm-downloads-shield]][npm-downloads-link] [![][github-releasedate-shield]][github-releasedate-link] [![][github-action-test-shield]][github-action-test-link] [![][github-action-release-shield]][github-action-release-link] [![][codecov-shield]][codecov-link] <br/> [![][github-contributors-shield]][github-contributors-link] [![][github-forks-shield]][github-forks-link] [![][github-stars-shield]][github-stars-link] [![][github-issues-shield]][github-issues-link] [![][github-license-shield]][github-license-link] <br/> [![][ant-design-shield]][ant-design-link] [![][devops-dumi-shield]][devops-dumi-link] [![][devops-father-shield]][devops-father-link]

[English](./README.md)・简体中文・[Changelog](./CHANGELOG.md) . [Report Bug][github-issues-link] · [Request Feature][github-issues-link]

![](https://gw.alipayobjects.com/zos/kitchen/Aa%2452FxhWU/pro-chat.webp)

</div>

<details>
<summary><kbd>目录</kbd></summary>

#### 目录

- [📦 安装](#-安装)
  - [使用 Next.js 进行编译](#使用-nextjs-进行编译)
- [🔨 使用](#-使用)
- [✨ 特性](#-特性)
- [👀 展示](#-展示)
- [🖥 浏览器兼容性](#-浏览器兼容性)
- [⌨️ 本地开发](#️-本地开发)
- [🤝 贡献](#-贡献)
- [🛣️ 生态系统](#️-生态系统)

####

</details>

## 📦 安装

> \[!IMPORTANT]\
> 此包仅支持 [ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)。

要安装 `@ant-design/pro-chat`，请运行以下命令：

```bash
$ pnpm install @ant-design/pro-chat
```

这个项目基于 `antd` `antd-style`，所以你还没安装过这两个依赖，也请安装一下。

```bash
$ pnpm install antd-style  // peerDependencies
$ pnpm install antd  // peerDependencies
```

### 使用 Next.js 进行编译

> \[!NOTE]\
> 为了正确使用 Next.js SSR，请在 `next.config.js` 中添加 `transpilePackages: ['@ant-design/pro-chat']`。例如：

```js
const nextConfig = {
  transpilePackages: ['@ant-design/pro-chat', 'react-intersection-observer'],
};
```

> \[!NOTE]\
> 如果你使用的是新版本的 NextJs(higher than 14)，现在不需要你配置 transpilePackages 也可以在 NextJs 中运行了

<br/>

## 🔨 使用

```tsx
import { ProChat } from '@ant-design/pro-chat';

export default () => (
  <ProChat
    request={async (messages) => {
      // 使用 Message 作为参数发送请求
      return Message; // 支持流式和非流式
    }}
  />
);
```

<br/>

## ✨ 特性

> \[!NOTE]
>
> ProChat 专注于快速搭建起大语言模型 Chat 对话框架。它旨在赋予开发人员轻松打造丰富、动态和直观的聊天界面的能力。

[![](https://next.ossinsight.io/widgets/official/compose-activity-trends/thumbnail.png?repo_id=707504998&image_size=auto&color_scheme=dark)](https://next.ossinsight.io/widgets/official/compose-activity-trends?repo_id=707504998)

**聊天界面组件的框架和解决方案：**

- 🔄 **自动聊天缓存**: 无需额外努力地保持对话连续性，确保用户体验流畅。
- 💬 **简化对话**: 提供不同对话风格的选择，迎合不同用户偏好。
- ✏️ **消息编辑功能**: 提供一套编辑工具，包括请求重做、编辑组合和删除，以精确控制对话。
- 📖 **自动渲染 Markdown**: 通过将 Markdown 转换为精美格式的消息，提供丰富的文本体验，让用户沉浸其中。
- 🎚️ **程序控制（Refs）**: 精确控制对话流程，允许开发人员创建定制的对话体验。
- <br/>

**设计演进 / 进行中**

- [ ] **带有编辑能力的对话自定义渲染** - [issue/21](https://github.com/ant-design/pro-chat/issues/21)
- [ ] **增强的请求参数** - 为您的请求注入额外参数的能力即将到来
- [ ] **个性化错误处理** - 为意外时刻制定独特的回退和配置
- [ ] **扩展文档和全球化** - 获取全面的指南和国际支持，获得真正无国界的体验
- [ ] **原子组件设计** - 预期一种既简单又多功能的设计方法

<br/>

## 👀 展示

让我们展示一些 ProChat 的标志性能力：

|        **流式对话**        |    **内容编辑器**    |
| :------------------------: | :------------------: |
|   流式对话，输出丝滑流畅   | 实时编辑完善你的对话 |
|       ![][prevew-1]        |    ![][prevew-3]     |
|       **集成渲染器**       |                      |
| 内容多功能 Markdown 渲染器 |                      |
|       ![][prevew-2]        |                      |

<br/>

## 🖥 浏览器兼容性

> \[!NOTE]
>
> - 现代浏览器和 Internet Explorer 11（需要[兼容性填充](https://stackoverflow.com/questions/57020976/polyfills-in-2019-for-ie11)）
> - [Electron](https://www.electronjs.org/)

| [![edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![electron_48x48](https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png)](http://godban.github.io/browsers-support-badges/) |
| --- | --- | --- | --- | --- |
| Edge | 最近 2 个版本 | 最近 2 个版本 | 最近 2 个版本 | 最近 2 个版本 |

<br/>

## ⌨️ 本地开发

您可以使用 Github Codespaces 进行在线开发：

[![][github-codespace-shield]][github-codespace-link]

或者克隆它进行本地开发：

```bash
$ git clone https://github.com/ant-design/pro-chat.git
$ cd pro-chat
$ pnpm install
$ pnpm dev
```

<br/>

## 🤝 贡献

> \[!IMPORTANT]
>
> 加入我们的协作生态系统。您的贡献是我们项目的心脏。以下是您如何成为我们充满活力的社区的重要组成部分：

- **整合和创新**：将 Ant Design Pro、umi 和 ProChat 整合到您的项目中。您的实际使用和反馈对我们非常宝贵。
- **发表您的见解**：遇到了问题？有疑问？您的观点很重要。通过提交[问题][github-issues-link]来分享它们，帮助我们提升用户体验。
- **塑造未来**：有代码增强或功能想法吗？我们邀请您提出[拉取请求][pr-welcome-link]，直接为我们的代码库发展做出贡献。

每一个贡献，无论大小，都值得庆祝。加入我们，共同致力于完善和提升开源企业 UI 组件的世界。 😃

[![][pr-welcome-shield]][pr-welcome-link]

<a href="https://github.com/ant-design/pro-chat/graphs/contributors" target="_blank">
  <table>
    <tr>
      <th colspan="2">
        <br><img src="https://contrib.rocks/image?repo=ant-design/pro-chat"><br><br>
      </th>
    </tr>
    <tr>
      <td>
        <img src="https://next.ossinsight.io/widgets/official/compose-org-active-contributors/thumbnail.png?activity=active&period=past_28_days&owner_id=12101536&repo_ids=707504998&image_size=2x3&color_scheme=dark">
      </td>
      <td rowspan="2">
        <img src="https://next.ossinsight.io/widgets/official/compose-org-participants-growth/thumbnail.png?activity=active&period=past_28_days&owner_id=12101536&repo_ids=707504998&image_size=4x7&color_scheme=dark">
      </td>
    </tr>
    <tr>
      <td>
        <img src="https://next.ossinsight.io/widgets/official/compose-org-active-contributors/thumbnail.png?activity=new&period=past_28_days&owner_id=12101536&repo_ids=707504998&image_size=2x3&color_scheme=dark">
      </td>
    </tr>
  </table>
</a>

<br/>

## 🛣️ 生态系统

- **[ProComponents](https://github.com/ant-design/pro-components)** - 专为企业级应用设计，像专业人士一样使用 Ant Design！
- **[ProEditor](https://github.com/ant-design/pro-editor)** - 终极编辑器 UI 框架和组件。
- **[ProFlow](https://github.com/ant-design/pro-flow)** - 基于 React-Flow 的流程编辑器框架。
- **[ProChat](https://github.com/ant-design/pro-chat)** - 用于快速构建 LLM 聊天界面的组件库。

<br/>

---

#### 📝 License

Copyright © 2023 - present [AFX][ant-design-link] & [Ant Digital](https://antdigital.com). <br/> This project is [MIT](./LICENSE) licensed.

<!-- 链接组 -->

[ant-design-link]: https://ant.design
[ant-design-shield]: https://img.shields.io/badge/-Ant%20Design-1677FF?labelColor=black&logo=antdesign&style=flat-square
[codecov-link]: https://codecov.io/gh/ant-design/pro-chat
[codecov-shield]: https://img.shields.io/codecov/c/github/ant-design/pro-chat?color=1677FF&labelColor=black&style=flat-square&logo=codecov&logoColor=white
[devops-dumi-link]: https://d.umijs.org/
[devops-dumi-shield]: https://img.shields.io/badge/docs%20by-dumi-blue?color=1677FF&labelColor=black&style=flat-square
[devops-father-link]: https://github.com/umijs/father
[devops-father-shield]: https://img.shields.io/badge/build%20with-father-028fe4.svg?color=1677FF&labelColor=black&style=flat-square
[github-action-release-link]: https://github.com/ant-design/pro-chat/actions/workflows/release.yml
[github-action-release-shield]: https://img.shields.io/github/actions/workflow/status/ant-design/pro-chat/release.yml?color=1677FF&label=release&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-action-test-link]: https://github.com/ant-design/pro-chat/actions/workflows/test.yml
[github-action-test-shield]: https://img.shields.io/github/actions/workflow/status/ant-design/pro-chat/test.yml?color=1677FF&label=test&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-codespace-link]: https://codespaces.new/ant-design/pro-chat
[github-codespace-shield]: https://github.com/codespaces/badge.svg
[github-contributors-link]: https://github.com/ant-design/pro-chat/graphs/contributors
[github-contributors-shield]: https://img.shields.io/github/contributors/ant-design/pro-chat?color=1677FF&labelColor=black&style=flat-square
[github-forks-link]: https://github.com/ant-design/pro-chat/network/members
[github-forks-shield]: https://img.shields.io/github/forks/ant-design/pro-chat?color=1677FF&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/ant-design/pro-chat/issues
[github-issues-shield]: https://img.shields.io/github/issues/ant-design/pro-chat?color=1677FF&labelColor=black&style=flat-square
[github-license-link]: https://github.com/ant-design/pro-chat/blob/main/LICENSE
[github-license-shield]: https://img.shields.io/github/license/ant-design/pro-chat?color=1677FF&labelColor=black&style=flat-square
[github-releasedate-link]: https://github.com/ant-design/pro-chat/releases
[github-releasedate-shield]: https://img.shields.io/github/release-date/ant-design/pro-chat?color=1677FF&labelColor=black&style=flat-square
[github-stars-link]: https://github.com/ant-design/pro-chat/network/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/ant-design/pro-chat?color=1677FF&labelColor=black&style=flat-square
[npm-downloads-link]: https://www.npmjs.com/package/@ant-design/pro-chat
[npm-downloads-shield]: https://img.shields.io/npm/dt/@ant-design/pro-chat?labelColor=black&style=flat-square&color=1677FF
[npm-release-link]: https://www.npmjs.com/package/@ant-design/pro-chat
[npm-release-shield]: https://img.shields.io/npm/v/@ant-design/pro-chat?color=1677FF&labelColor=black&logo=npm&logoColor=white&style=flat-square
[pr-welcome-link]: https://github.com/ant-design/pro-chat/pulls
[pr-welcome-shield]: https://img.shields.io/badge/%E2%9D%A4%EF%B8%8F%20PR%20WELCOME-%E2%86%92-1677FF?labelColor=black&style=for-the-badge
[prevew-1]: https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*0uQhSIzSS3YAAAAAAAAAAAAADmuEAQ/original
[prevew-2]: https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*e4JbQKfupVQAAAAAAAAAAAAADmuEAQ/original
[prevew-3]: https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*wVSCTb7bq8UAAAAAAAAAAAAADmuEAQ/original
