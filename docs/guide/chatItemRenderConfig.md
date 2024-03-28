---
title: 深度自定义对话内容
order: 21
group:
  title: 使用案例
nav:
  title: 文档
  order: 0
---

## 深度自定义对话内容

很多时候业务场景下并不会那么理想，永远返回一些数据。

他可能会想要展示一个图表、甚至是一个表单，或者任意一个带有业务属性的 React 组件，这个时候该怎么办？

我们提供了一个 `chatItemRenderConfig` 的 api 来帮助你解决这一类问题。

## chatItemRenderConfig 参数说明

这个 `api` 包含 5 个参数

- `titleRender`: 标题渲染函数
- `contentRender`: 内容渲染函数
- `actionsRender`: 操作渲染函数
- `avatarRender`: 头像渲染函数
- `render`: 自定义渲染函数

## 使用案例

以下是如何在ProChat组件中使用 `chatItemRenderConfig` 的示例：

### 特殊通知

<code src="./demos/controled-servers-push.tsx" ></code>

在上述代码中，我们通过设置 `render` 函数来自定义通知类消息的展示方式。当检测到消息来源角色为 `notification`时，将默认展示替换成带有警告图标和信息提示的 `Alert` 组件。

### 表单提交

<code src="./demos/render-form-chats.tsx" ></code>

在上述代码中，我们通过设置 `contentRender` 函数配合特殊的元数据，做到了代入参数让 AI 执行填写表单的逻辑。

### 深度交互逻辑

<code src="./demos/render-chats-nextGen.tsx" ></code>

这个代码展示了一个非常特殊的交互场景，你可以依靠上下文非常动态的调整你需要的渲染内容。

## 源码中影响范围

源码里面关于如何根据配置对象 `chatItemRenderConfig` 中提供的相关渲染方法来构建每个聊天项（即每条消息）。以下是关键点解释：

1. 对于头像 (`avatar`)、标题 (`title`)、内容 (`content`) 和操作按钮 (`actions`) 等部分均有独立的 useMemo 钩子进行处理，并且可通过相应参数进行自定义。
2. 如果提供了总体自定义渲染方法 (`render`) 并且返回非空结果，则会优先使用该方法直接返回最终 DOM 结构。
3. 所有 useMemo 钩子和最后返回结构都依赖于外部传入的 `chatItemRenderConfig` 参数。

注意：若要正确地使用此API，请确保你对React以及Ant Design库有一定程度上的理解，并且能够编写相应类型符合预期要求与逻辑业务场景匹配的自定义函数。
