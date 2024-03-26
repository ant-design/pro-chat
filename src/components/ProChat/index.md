---
nav: 组件
group: Chat
title: ProChat
order: 0
description: a Chat Solution
---

## Default

通过返回流式 Response 请求，实现会话消息的打字机输出效果。

<code src="./demos/request.tsx"></code>

<code src="./demos/sse.tsx"></code>

## APIs

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| style | 样式 | CSSProperties | - |
| className | 主类名 | string | - |
| chatRef | 聊天引用，用于操作数据 | ProChatChatReference | - |
| loading | 是否加载中 | boolean | - |
| initialChatsList | 初始聊天记录 | ChatPropsState\['chatList'] | - |
| userMeta | 用户元数据 | MetaData | - |
| assistantMeta | 助手元数据 | MetaData | - |
| config | 语言模型角色设定 | ModelConfig | - |
| chatList | 聊天记录 | ChatMessage[] | - |
| onChatsChange | 聊天记录变化回调函数， | (chatList: ChatMessage[]) => void | chat |
| displayMode | 显示模式，默认是 chat | 'chat' \| 'docs' | - |
| helloMessage | 欢迎消息 | string\| ReactNode | - |
| request | 请求消息 | string \| ChatRequest | - |
| onResetMessage | 重置消息回调函数 | `() => Promise<void>` | - |
| genMessageId | 生成消息 id 的函数，如果你的项目需要持久化时才需要使用 | \`() => Promise<string>\`\` | nanoid |
| autocompleteRequest | 获取自动完成列表的请求函数 | \`(value: string) => Promise<{ value: string; label?: string; }\[]>\`\` | - |
| placeholder | 输入框占位符 | string | - |
| messageItemExtraRender | 信息框额外渲染函数 | `(message: ChatMessage, type: 'assistant' \| 'user') => React.ReactNode` | - |
| actions | 信息框顶部的操作列表 | `{ flexConfig?: FlexBasicProps, render?: (defaultDoms: JSX.Element[]) => JSX.Element[] }` | - |
| actions.flexConfig | 控制 input 顶部的操作区域的 flex 布局 | `FlexBasicProps` | - |
| actions.render | 控制 input 顶部的操作区域的操作按钮 | `(defaultDoms: JSX.Element[]) => JSX.Element[]` | - |
| chatItemRenderConfig | 聊天项渲染配置 | `ChatItemRenderConfig` | - |
| backToBottomConfig | 透传给「回到底部」组件的 api | `BackBottomProps` | - |

## ProChatChatReference

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| getChats | 获取当前聊天列表对象 | () => ChatStore['chatList'] | - |
| getChatMessages | 获取当前聊天消息列表 | () => ChatMessage[] | - |
| setMessageContent | 设置消息内容 | (id: string, content: string) => void | - |
| setMessageValue | 修改消息的某个属性 | (id: string, key: keyof ChatMessage<Record<string, any>>, value: any) => void | - |
| scrollToBottom | 滚动到底部 | () => void | - |
| resendMessage | 重新发送消息 | (messageId: string) => void | - |
| stopGenerateMessage | 停止生成消息 | () => void | - |
| sendMessage | 发送消息 | (content: string) => void | - |
| deleteMessage | 删除消息 | (messageId: string) => void | - |
| clearMessage | 清除消息 | () => void | - |

## chatItemRenderConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| titleRender | 标题渲染函数 | WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode> | - |
| contentRender | 内容渲染函数 | WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode> | - |
| actionsRender | 操作渲染函数 | WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode> | - |
| avatarRender | 头像渲染函数 | WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode> | - |
| render | 自定义渲染函数 | WithFalse<(props: ChatItemProps, defaultDom: { avatar: ReactNode; title: ReactNode; messageContent: ReactNode; actions: ReactNode; itemDom: ReactNode; }) => ReactNode> | - |

## backToBottomConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 类名 | string | - |
| style | 额外添加的css内容 | CSSProperties | - |
| onClick | 点击按钮的回掉 | `React.MouseEventHandler<HTMLElement>` | - |
| text | 展示的内容 | string | `Back to bottom` |
| render | 自定义渲染的方法 | (defaultDom: React.ReactNode,scrollToBottom,BackBottomConfig: BackBottomProps) => React.ReactNode | - |
| alwaysShow | 是否一直显示按钮 | boolean | false |
