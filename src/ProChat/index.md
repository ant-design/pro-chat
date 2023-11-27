---
nav: 组件
group: Chat
title: ProChat
order: 0
description: a Chat Solution
---

## Default

指定请求

<code src="./demos/request.tsx"></code>

### 非流式模式

非流式模式下，会话消息会一次性全部返回，适用于消息量较少的场景。如果消息量较大，可能用户体验较差。

<code src="./demos/no-stream.tsx"></code>

## 受控模式

使用 `chats` 和 `onChatsChange` 实现 chats 会话消息的受控

<code src="./demos/control.tsx"></code>

## 设定初始会话消息

使用 `initialChats` 设定初始会话消息。

<code src="./demos/initialChats.tsx"></code>

## 设定打招呼消息

通过 `helloMessage` 设定打招呼消息。

<code src="./demos/helloMessage.tsx"></code>

## 加载中

使用 loading 字段控制加载中状态。适用于第一次加载数据时使用。

<code src="./demos/loading.tsx"></code>

## 文档模式

类 OpenAI 的文档模式，使用 `doc` 字段控制文档模式。适用于需要展示文档的场景。

<code src="./demos/doc-mode.tsx"></code>

## 指定会话双方的头像、名称

ProChat使用 `meta` 来表意会话双方的头像、名称等信息。设定助手的头像、名称使用 `assistantMeta`，设定用户的头像、名称使用 `userMeta`。 使用 `showTitle` 显示名称。

<code src="./demos/meta.tsx"></code>

## 悬浮窗使用

将 `ProChat` 组件作为会话解决方案

<code src="./demos/draggable.tsx"></code>

## 编程式操作控制

### chatRef

在一些简单场景下，使用 `chatRef` 可以获取 `ProChatInstance` ，以在组件同级控制 ProChat 行为。

<code src="./demos/use-ref.tsx"></code>

### useProChat

针对一些复杂场景，可以搭配 `ProChatProvider` 和 `useProChat` hooks， 实现编程式消息发送、获取、删除等行为。

<code src="./demos/use-pro-chat.tsx"></code>

:::warning

useProChat hooks 必须在包裹 `ProChatProvider` 后方可使用。

:::

:::warning

所有 `initialChats` 等初始化 props 需要从 `ProChat` 移动至 `ProChatProvider`

:::

## APIs

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| showTitle | 是否显示标题 | Boolean | - |
| style | 样式 | CSSProperties | - |
| className | 主类名 | string | - |
| chatRef | 聊天引用,用于操作数据 | ProChatChatReference | - |
| loading | 是否加载中 | boolean | - |
| initialChats | 初始聊天记录 | ChatPropsState['chats'] | - |
| userMeta | 用户元数据 | MetaData | - |
| assistantMeta | 助手元数据 | MetaData | - |
| config | 语言模型角色设定 | ModelConfig | - |
| chats | 聊天记录 | ChatMessageMap | - |
| onChatsChange | 聊天记录变化回调函数, | (chats: ChatMessageMap) => void | chat |
| displayMode | 显示模式，默认是 chat | 'chat' \| 'docs' | - |
| helloMessage | 欢迎消息 | string | - |
| request | 请求消息 | string \| ChatRequest | - |
| onResetMessage | 重置消息回调函数 | () => Promise<void> | - |
| autocompleteRequest | 获取自动完成列表的请求函数 | (value: string) => Promise<{ value: string; label?: string; }[]> | - |
| placeholder | 输入框占位符 | string | - |
| messageItemExtraRender | 信息框额外渲染函数 | `(message: ChatMessage, type: 'assistant' \| 'user') => React.ReactNode` | - |
| actions | 信息框顶部的操作列表 | `{ flexConfig?: FlexBasicProps, render?: (defaultDoms: JSX.Element[]) => JSX.Element[] }` | - |
| actions.flexConfig | 控制 input 顶部的操作区域的 flex 布局 | `FlexBasicProps` | - |
| actions.render | 控制 input 顶部的操作区域的操作按钮 | `(defaultDoms: JSX.Element[]) => JSX.Element[]` | - |
