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

<code src="./demos/default.tsx"></code>

## SSE Data stream processing

For cases where the backend directly returns Server Side Event data, the frontend needs to encapsulate ` ReadableStream` themselves

Generally speaking, a third-party solution can be directly adopted, such as parsing Vercel's AI library. For details, please refer to [Document - What is Streaming Output](../guide/sse)

<code src="./demos/sse.tsx"></code>

## Big data rendering

<code src="./demos/bigData.tsx">Stream requests</code>

## Non streaming mode

In non streaming mode, all session messages will be returned at once, which is suitable for scenarios with low message volume. If the message volume is large, the user experience may be poor.

<code src="./demos/no-stream.tsx" description='The message will return after waiting for 5 seconds'>Non streams requests</code>

## Controlled mode

Implement controlled chat session messages using `chats` and `onChatsChange`

<code src="./demos/control.tsx"></code>

## Set initial session messages

Use `initialChats` to set the initial session message.

<code src="./demos/initialChats.tsx"></code>

## Set greeting messages

Set greeting messages through `helloMessage`.

<code src="./demos/helloMessage.tsx"></code>

## Loading

Use the loading field to control the loading status. Suitable for use when loading data for the first time.

<code src="./demos/loading.tsx">Set loading to add data acquisition status</code>

## Document Mode

OpenAI like document mode, using the `doc` field to control document mode. Suitable for scenarios where documents need to be displayed.

<code src="./demos/doc-mode.tsx"></code>

## Specify the avatars and names of both parties in the conversation

ProChat uses `meta` to represent the avatars, names, and other information of both parties in the conversation. Set the assistant's avatar and name to use `assistantMeta` , and set the user's avatar and name to use `userMeta`. Use `showTitle` to display the name.

<code src="./demos/meta.tsx"></code>

## Custom Actions

<code src="./demos/actions.tsx"></code>

## Customize the [Back to Bottom] button

You can customize the [Back to Bottom] button to varying degrees through the backToBottomConfiguration parameter

<code src="./demos/toBottomConfig.tsx"></code>

## Custom input area

Sometimes you may feel that the default input area is not user-friendly enough, or if you have some custom input module requirements, you can use renderInputArea for custom input. If you do not need an input area, you can pass in `renderInputArea={()=>null}`。

Here is a demonstration case that supports image uploading. Try uploading files and submitting them.

<code src="./demos/renderInputArea.tsx"></code>

## Sidebar Usage

Use the ProChat component as a conversation solution, utilizing antd's FloatButton and Modal to achieve an elegant sidebar mode.

<code src="./demos/float-drawer.tsx"></code>

## Programming operation control

### chatRef

In some simple scenarios, using `chatRef` can obtain `ProChatInstance` to control ProChat behavior at the same level as the component.

<code src="./demos/use-ref.tsx"></code>

### useProChat

For some complex scenarios, `ProChatProvider` and `useProChat` hooks can be used to achieve programmatic message sending, retrieval, deletion, and other behaviors.

<code src="./demos/use-pro-chat.tsx"></code>

:::warning

UseProChat hooks must be used in the `ProChatProvider` before they can be used.

:::

:::warning

All initialization props such as `initialChats` need to be moved from `ProChat` to `ProChatProvider`

:::

## International

<code src="./demos/i18n.tsx"></code>

## Custom Callback

<code src="./demos/callbacks.tsx"></code>

## APIs

| Parameter | description | type | default |
| --- | --- | --- | --- |
| showTitle | Is the title displayed | Boolean | - |
| style | style | CSSProperties | - |
| className | Main className | string | - |
| chatRef | Chat references, used for manipulating data | ProChatChatReference | - |
| loading | Loading or not | boolean | - |
| initialChats | Initial chat history | ChatPropsState\['chats'] | - |
| userMeta | User Metadata | MetaData | - |
| assistantMeta | Assistant metadata | MetaData | - |
| config | Language Model Role Setting | ModelConfig | - |
| onScroll | monitoring of scroll events | onScroll: (e: Event) => void | - |
| chats | Chat history | ChatMessage[] | - |
| onChatsChange | Chat record change callback function, | (chats: ChatMessage[]) => void | chat |
| displayMode | Display mode, default to chat | 'chat' \| 'docs' | - |
| helloMessage | Welcome message | string\| ReactNode | - |
| request | Request message | string \| ChatRequest | - |
| onResetMessage | Reset message callback function | `() => Promise<void>` | - |
| itemShouldUpdate | Determine if each sub item needs to be re evaluated render | `(prevProps: ChatListItemProps, nextProps: ChatListItemProps) => boolean` | - |
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
| getChats | Get the current chat list object | () => ChatStore['chats'] | - |
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
