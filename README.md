<div align="center">

<img height="120" src="https://gw.alipayobjects.com/zos/kitchen/wzToJwlSw%24/logo.svg">
<img height="120" src="https://gw.alipayobjects.com/zos/kitchen/qJ3l3EPsdW/split.svg">
<img height="120" src="https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*Mo27Sr3kS4kAAAAAAAAAAAAADmuEAQ/original">

<h1>ProChat</h1>

Components Library for Quickly Building LLM Chat Interfaces.

[![][npm-release-shield]][npm-release-link] [![][npm-downloads-shield]][npm-downloads-link] [![][github-releasedate-shield]][github-releasedate-link] [![][github-action-test-shield]][github-action-test-link] [![][github-action-release-shield]][github-action-release-link] [![][codecov-shield]][codecov-link] <br/> [![][github-contributors-shield]][github-contributors-link] [![][github-forks-shield]][github-forks-link] [![][github-stars-shield]][github-stars-link] [![][github-issues-shield]][github-issues-link] [![][github-license-shield]][github-license-link] <br/> [![][ant-design-shield]][ant-design-link] [![][devops-dumi-shield]][devops-dumi-link] [![][devops-father-shield]][devops-father-link]

English · [简体中文](./README.zh-CN.md) · [Changelog](./CHANGELOG.md) . [Report Bug][github-issues-link] · [Request Feature][github-issues-link]

![](https://gw.alipayobjects.com/zos/kitchen/Aa%2452FxhWU/pro-chat.webp)

</div>

<details>
<summary><kbd>Table of contents</kbd></summary>

#### TOC

- [📦 Installation](#-installation)
  - [Compile with Next.js](#compile-with-nextjs)
- [🔨 Usage](#-usage)
- [✨ Features](#-features)
- [👀 Showcase](#-showcase)
- [🖥 Browser compatibility](#-browser-compatibility)
- [⌨️ Local Development](#️-local-development)
- [🤝 Contributing](#-contributing)
- [🛣️ Ecosystem](#️-ecosystem)

####

</details>

## 📦 Installation

> \[!IMPORTANT]
>
> This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

To install `@ant-design/pro-chat`, run the following command:

```bash
$ pnpm install @ant-design/pro-chat
```

This project is based on `antd` `antd-style`, so if you have not installed these two dependencies, please install them.

```bash
$ pnpm install antd-style // peerDependencies
$ pnpm install antd // peerDependencies
```

### Compile with Next.js

> \[!NOTE]
>
> By work correct with Next.js SSR, add `transpilePackages: ['@ant-design/pro-chat']` to `next.config.js`. For example:

```js
const nextConfig = {
  transpilePackages: ['@ant-design/pro-chat', 'react-intersection-observer'],
};
```

> \[!NOTE]
>
> If you are using a new version of NextJs (higher than 14), you no longer need to configure transpilePackages to run in NextJs.

<br/>

## 🔨 Usage

```tsx
import { ProChat } from '@ant-design/pro-chat';

export default () => (
  <ProChat
    request={async (messages) => {
      // Send a request with Message as the parameter
      return Message; // Supports both streaming and non-streaming
    }}
  />
);
```

<br/>

## ✨ Features

> \[!NOTE]
>
> ProChat focuses on quickly setting up a large language model chat dialogue framework. It aims to empower developers to easily create rich, dynamic, and intuitive chat interfaces.

[![](https://next.ossinsight.io/widgets/official/compose-activity-trends/thumbnail.png?repo_id=707504998&image_size=auto&color_scheme=dark)](https://next.ossinsight.io/widgets/official/compose-activity-trends?repo_id=707504998)

**Framework and Solutions for Chat Interface Components:**

- 🔄 **Automatic Chat Caching**: Maintains conversation continuity without any extra effort, ensuring a smooth user experience.
- 💬 **Streamlined Conversations**: Offers the choice between different conversation styles, catering to diverse user preferences.
- ✏️ **Message Editing Features**: Provides a suite of editing tools, including request redo, edit combination, and deletion, for precise conversation control.
- 📖 **Auto-rendered Markdown**: Delivers a rich text experience that immerses users by transforming Markdown into beautifully formatted messages.
- 🎚️ **Programmatic Controls (Ref)**: Commands the chat flow with precision, allowing developers to create a tailored conversational experience.

<br/>

**Design Evolution / In Progress**

- [ ] **Customized Dialogue Rendering with Edit Capabilities** - [issue/21](https://github.com/ant-design/pro-chat/issues/21)
- [ ] **Enhanced Request Parameters** - The power to infuse additional parameters into your requests is on the horizon
- [ ] **Personalized Error Handling** - Craft unique fallbacks and configurations for those unexpected moments
- [ ] **Expanded Documentation & Globalization** - Access comprehensive guides and international support for a truly borderless experience
- [ ] **Atomic Component Design** - Anticipate a modular approach to design that promises both simplicity and versatility

<br/>

## 👀 Showcase

Let's showcase some of ProChat's signature features:

| **Streamlined Dialogue** | **Content Editor** |
| :-: | :-: |
| Engage in Streamlined Conversations that flow as naturally as a river | Refine, reshape, and perfect your dialogue with tools that allow for real-time edits. |
| ![][prevew-1] | ![][prevew-3] |
| **Integrated Render** |  |
| Dive into the vivid world of chat with our Built-in Render, a tool designed to bring text to life. |  |
| ![][prevew-2] |  |

<br/>

## 🖥 Browser compatibility

> \[!NOTE]
>
> - Modern browsers and Internet Explorer 11 (with [polyfills](https://stackoverflow.com/questions/57020976/polyfills-in-2019-for-ie11))
> - [Electron](https://www.electronjs.org/)

| [![edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![electron_48x48](https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png)](http://godban.github.io/browsers-support-badges/) |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

<br/>

## ⌨️ Local Development

You can use Github Codespaces for online development:

[![][github-codespace-shield]][github-codespace-link]

Or clone it for local development:

```bash
$ git clone https://github.com/ant-design/pro-chat.git
$ cd pro-chat
$ pnpm install
$ pnpm dev
```

<br/>

## 🤝 Contributing

> \[!IMPORTANT]
>
> Join our collaborative ecosystem. Your contributions are the heartbeat of our project. Here's how you can be an integral part of our vibrant community:

- **Integrate and Innovate**: Incorporate Ant Design Pro, umi, and ProChat into your projects. Your real-world usage and feedback are invaluable to us.
- **Voice Your Insights**: Encounter a glitch? Have a query? Your perspectives matter. Share them by submitting [issues][github-issues-link] and help us enhance the user experience.
- **Shape the Future**: Have code enhancements or feature ideas? We invite you to propose [pull requests][pr-welcome-link] and contribute directly to the evolution of our codebase.

Every contribution, big or small, is celebrated. Join us in our mission to refine and elevate the world of open-source enterprise UI components. 😃

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

## 🛣️ Ecosystem

- **[ProComponents](https://github.com/ant-design/pro-components)** - Designed for Enterprise-Level Application, Use Ant Design like a Pro!.
- **[ProEditor](https://github.com/ant-design/pro-editor)** - The Ultimate Editor UI Framework and Components.
- **[ProFlow](https://github.com/ant-design/pro-flow)** - A Flow Editor Framework base on React-Flow.
- **[ProChat](https://github.com/ant-design/pro-chat)** - Components Library for Quickly Building LLM Chat Interfaces.

<br/>

---

#### 📝 License

Copyright © 2023 - present [AFX][ant-design-link] & [Ant Digital](https://antdigital.com). <br/> This project is [MIT](./LICENSE) licensed.

<!-- LINK GROUP -->

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
