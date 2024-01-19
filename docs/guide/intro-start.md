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

### 设计思路

#### 一个 Request 为核心

使用过 [ProComponets](https://github.com/ant-design/pro-components) `ProTable` 的同学都知道，在 `ProTable` 中最核心的 `api` 就是 `Request`，发起一个请求，并返回数据渲染整个 `Table`，你在 `ProTable` 中把 Request 写上就相当于做完了一半的表格。

在 `ProChat` 中也是类似的。在大模型场景下，对于一个前端开发者来说，我们只会在乎「模型返回给我的是什么」我们可不想处理那么多奇奇怪怪的数据结构

```json
{
  "status_code": 200,
  "request_id": "05dc83af-7185-9e14-9b0b-4466de159d6a",
  "code": "",
  "message": "",
  "output": {
    "text": null,
    "finish_reason": null,
    "choices": [
      {
        "finish_reason": "stop",
        "message": {
          "role": "assistant",
          "content": "首先，准备两个鸡蛋，一个西红柿，适量的盐、糖、料酒和生抽。将鸡蛋打入碗中，搅拌均匀，西红柿切块。锅中加油，油热后加入鸡蛋液，炒至金黄色，盛出备用。锅中加油，油热后加入西红柿块，翻炒均匀，加入适量的盐、糖、料酒和生抽，炒至西红柿软烂，加入炒好的鸡蛋，翻炒均匀即可。"
        }
      }
    ]
  },
  "usage": {
    "input_tokens": 12,
    "output_tokens": 98,
    "total_tokens": 110
  }
}
```

对于我们来说，或者换句话说，对于有类似对话类需求的业务来说，我们应该只在乎这一句返回的话。（特殊情况除外）

因此 Request 我们设计为返回有且只是一个 String

> 在流式和非流式我们都只关心 String，但是对于处理手法不太一样，详情可见组件案例

那么入参呢？

这是通义千问的大模型入参，可以看到参数非常多，而且不同的模型入参是不太一样的，做组件的时候是要考虑到平很性的。经过权衡，我们最终将入参数的结构设计为如下的结构（感兴趣的可以点开查看）

```js
const Message = {
  "content": "你是谁",
  "createAt": 1702627794204,
  "id": "TO5HsnCz",
  "meta": {
    "avatar": "😀",
    "title": undefined
  },
  "parentId": undefined,
  "role": "user",
  "updateAt": 1702627794204
}

type Message = {
  content: string;
  createAt: number;
  id: string;
  meta?: { avatar: string; title?: undefined };
  parentId?: undefined;
  role: 'user';
  updateAt: number;
}
```

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

> 这里需要转换的内容除了 ProChat 外，另外几个是底层的 @ant-design/pro-editor 以及配套的依赖内容，后续我们会尝试优化让你可以少配置一些。

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
