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

### 🚧 使用原子化能力

> Working in Progress 当前该部分能力仍处于高速开发中，敬请期待。

ProChat 后续会提供一系列原子化的组件，在特殊情况下你可能会想要使用某些 ProChat 中的独立组件，这些需求我们也会提供类似的组件来帮助大家更好的搭建应用。

如果你有更多想法和需求，欢迎来 [Issue](https://github.com/ant-design/pro-chat/issues) 和 [讨论区](https://github.com/ant-design/pro-chat/discussions) 和我们沟通！

> 我们下一个计划是提供一个复杂的模型参数面板：欢迎围观 [「RFC」New Component：ModalConfig 模型参数面板](https://github.com/ant-design/pro-chat/discussions/58)

有部分的底层组件，例如 Markdown、Highlight 之类的，我们会依赖于 [ProEditor - 编辑器 UI 组件库](https://github.com/ant-design/pro-editor)，因此如果你也有搭建编辑器的场景，可以来这里看看。

## 工程化能力

### 按需加载

ProChat 默认支持基于 ES modules 的 tree shaking，直接引入 `import { ProChat } from '@ant-design/pro-chat`; 就会有按需加载的效果。

### TypeScript

ProChat 使用 TypeScript 进行开发，因此提供了完整的类型定义。
