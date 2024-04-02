---
nav: Components
group: Chat
title: ProChat
order: 0
description: a Chat Solution
---

## Default

By returning a streaming response request, achieve the typewriter output effect of the conversation message.

<code src="./demos/request.tsx">Streaming requests</code>

UseProChat hooks must be used in the `ProChatProvider` before they can be used.

:::warning

All initialization props such as `initialChatsList` need to be moved from `ProChat` to `ProChatProvider`

:::

## APIs

| Parameter | description | type | default |
| --- | --- | --- | --- |
| style | style | CSSProperties | - |
| className | Main className | string | - |
| chatRef | Chat references, used for manipulating data | ProChatChatReference | - |
| loading | Loading or not | boolean | - |
| initialChatsList | Initial chat history | ChatPropsState\['chatList'] | - |
| userMeta | User Metadata | MetaData | - |
| assistantMeta | Assistant metadata | MetaData | - |
| config | Language Model Role Setting | ModelConfig | - |
| chatList | Chat history | ChatMessage[] | - |
| onChatsChange | Chat record change callback function, | (chatList: ChatMessage[]) => void | chat |
| displayMode | Display mode, default to chat | 'chat' \| 'docs' | - |
| helloMessage | Welcome message | string\| ReactNode | - |
| request | Request message | string \| ChatRequest | - |
| onResetMessage | Reset message callback function | `() => Promise<void>` | - |
| genMessageId | The function for generating message IDs is only needed if your project needs persistence | \`() => Promise<string>\`\` | nanoid |
| autocompleteRequest | Request function for obtaining the auto complete list | \`(value: string) => Promise<{ value: string; label?: string; }\[]>\`\` | - |
| placeholder | Input box placeholder | string | - |
| messageItemExtraRender | Additional rendering function for information boxes | `(message: ChatMessage, type: 'assistant' \| 'user') => React.ReactNode` | - |
| actions | Action list at the top of the information box | `{ flexConfig?: FlexBasicProps, render?: (defaultDoms: JSX.Element[]) => JSX.Element[] }` | - |
| actions.flexConfig | Control the flex layout of the operation area at the top of the input | `FlexBasicProps` | - |
| actions.render | Control the operation buttons in the operation area at the top of the input | `(defaultDoms: JSX.Element[]) => JSX.Element[]` | - |
| chatItemRenderConfig | Chat item rendering configuration | `ChatItemRenderConfig` | - |
| backToBottomConfig | API passed through to the "return to bottom" component | `BackBottomProps` | - |

## ProChatChatReference

| Parameter | description | type | default |
| --- | --- | --- | --- |
| getChats | Get the current chat list object | () => ChatStore['chatList'] | - |
| getChatMessages | Get the current chat message list | () => ChatMessage[] | - |
| setMessageContent | Set message content | (id: string, content: string) => void | - |
| setMessageValue | Modify a certain property of a message | (id: string, key: keyof ChatMessage<Record<string, any>>, value: any) => void | - |
| scrollToBottom | Scroll to the bottom | () => void | - |
| resendMessage | Resend message | (messageId: string) => void | - |
| stopGenerateMessage | Stop generating messages | () => void | - |
| sendMessage | Send message | (content: string) => void | - |
| deleteMessage | Rremoval message | (messageId: string) => void | - |
| clearMessage | Clear messages | () => void | - |

## chatItemRenderConfig

| Parameter | description | type | default |
| --- | --- | --- | --- |
| titleRender | Title rendering function | WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode> | - |
| contentRender | Content rendering function | WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode> | - |
| actionsRender | Operate rendering functions | WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode> | - |
| avatarRender | Avatar rendering function | WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode> | - |
| render | Custom rendering functions | WithFalse<(props: ChatItemProps, defaultDom: { avatar: ReactNode; title: ReactNode; messageContent: ReactNode; actions: ReactNode; itemDom: ReactNode; }) => ReactNode> | - |

## backToBottomConfig

| Parameter | description | type | default |
| --- | --- | --- | --- |
| className | className | string | - |
| style | Additional CSS content added | CSSProperties | - |
| onClick | Click the button to fall back | `React.MouseEventHandler<HTMLElement>` | - |
| text | Displayed content | string | `Back to bottom` |
| render | Customized rendering methods | (defaultDom: React.ReactNode,scrollToBottom,BackBottomConfig: BackBottomProps) => React.ReactNode | - |
| alwaysShow | Is the button always displayed | boolean | false |
