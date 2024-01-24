---
title: 快速开始
group:
  title: 快速上手
  order: 0
nav:
  title: 文档
  order: 0
---

# 快速开始

ProEditor 定位为 Chat 对话模式下，给前端提供快速搭建对话内容的组件库

## 安装

```bash
# @ant-design/pro-editor 基于 antd 和 antd-style，需要在项目中安装
$ npm install antd antd-style -S
$ npm install @ant-design/pro-chat -S
```

因为底层依赖于 antd ，因此对版本有所要求

```json
"peerDependencies": {
  "antd": "^5",
  "antd-style": "^3",
  "react": "^18"
},
```

### 使用 ProChat 组件

ProChat 提供的最关键的组件就是 ProChat 组件，你可以你可以非常简单的使用它。

<code src="./demos/base.tsx" ></code>

#### 多种渲染支持

还有一点对前端来说比较头疼的在于「解析 - 渲染」

像是下面这种，如果你自己写，你需要对 String 部分的内容解析，然后决定哪些用什么渲染，我们已经帮你内置好了一些渲染器：Markdown 渲染、终端命令拼接、跳转链接等等常用的渲染器

<code src="./demos/doc-mode.tsx" ></code>

#### 快速编辑、重试、更多能力

如果问错了问题？我想从某个地方开始，修改我之前的问题呢？或者我觉得他回复的不太好，后续的问题我希望帮他修改一下他的回答？

我们支持快速编辑、删除、重新生成这些能力，这些都是集成在 `ProChat` 这个组件中，开发者完全不需要有心智负担如何去实现这些能力，因为我们把这套数据流给你维护好啦！

### 🚧 使用原子化能力

> Working in Progress 当前该部分能力仍处于高速开发中，敬请期待。

ProChat 后续会提供一系列原子化的组件，在特殊情况下你可能会想要使用某些 ProChat 中的独立组件，这些需求我们也会提供类似的组件来帮助大家更好的搭建应用。

有部分的底层组件，例如 Markdown、Highlight 之类的，我们会依赖于 [ProEditor - 编辑器 UI 组件库](https://github.com/ant-design/pro-editor)，因此如果你也有搭建编辑器的场景，可以来这里看看。

## 与框架集成

### 与 Umi 集成

在中后台的研发场景， umi 是一个非常不错的选择。ProEditor 与 umi 的集成非常容易。安装后直接使用即可。

### 与 Next.js 集成

[Next.js](https://nextjs.org/) 是社区中非常流行的研发框架。ProChat 与 Next.js 的集成也非常容易。

由于 Next.js 是一个 CSR、SSR 同构的 React 框架，而 ProChat 默认只提供 esm 模块，因此在安装后，需要在 `next.config.(m)js` 中 `transpilePackages` 中加入相关依赖：

> 在最新版本 NextJS 14 AppRoute 中可以不需要配置了

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 将纯 esm 模块转为 node 兼容模块
  transpilePackages: [
    '@ant-design/pro-chat',
    'react-intersection-observer',
    '@ant-design/pro-editor',
  ],
};
```

接下来和其他组件一样使用即可。

## 工程化能力

### 按需加载

ProChat 默认支持基于 ES modules 的 tree shaking，直接引入 `import { ProChat } from '@ant-design/pro-chat`; 就会有按需加载的效果。

### TypeScript

ProChat 使用 TypeScript 进行开发，因此提供了完整的类型定义。
