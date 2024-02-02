---
title: 多模态怎么接入
order: 19
group:
  title: 使用案例
nav:
  title: 文档
  order: 0
---

# 多模态怎么接入

一开始我们打算直接让 InputArea（即下方的输入框）支持上传各种各样的文件

但是一旦这么设计，就会导致更多的问题

- 图片我们是直接转 Base64 还是 Cdn？如果是 Cdn 是不是还需要提供一个 Cdn 的 api 给开发者？
- 图片还好说，但是除开图片之外的其他文件呢？各种文件是否需要预览？
- 这些文件到底以怎么样的形式拼接到 Prompt 中去呢？怎么定义这个 Prompt 的位置？

等等这些设计细节数不甚数，而且对于一些模型来说，并不一定支持多模态，默认提供分析下来并不是一个好的设计。

## 自定义输入部分

我们提供了一个 renderInputArea 的 api，来帮助你对多模态的情况下进行支持，以及和 ProChat 的数据流进行接入和交互

```ts
  renderInputArea?: (
    defaultDom: ReactNode,
    onMessageSend: (message: string) => void | Promise<any>,
    onClearAllHistory: () => void,
  ) => ReactNode;
```

renderInputArea 共有三个参数：

- defaultDom ：即默认渲染的 dom，你如果是想包裹或者添加一些小内容，可以直接在这个基础上进行组合
- onMessageSend ：发送数据的方法，这个方法和 ProChat.sendMessage（Hooks） 本质上是一个方法，用于向 ProChat 的数据流发送一条数据
- onClearAllHistory ： 清空当前对话的方法，这个方法和 ProChat.clearMessage（Hooks） 本质上是一个方法

这下子你就可以随意组合当前的内容，以及你打算做的各种需求，例如：阻止一些不好的对话、上传内容的前置校验等

## 一个图片上传的演示案例

<code src="./demos/renderInputArea.tsx" ></code>

我们来详细拆解下这个案例

### 默认使用Base64

案例中使用了 antd 的 Upload 组件，我们可以轻易拿到当前内容的 Base64，然后在 onMessageSend 将其进行组合

如果你想用 CDN 代替 Base64，你需要做的事情就是在数据流上做处理。

> 下面这个改动是建立在，Upload 组件配置的 actions 接口如果有 response 返回，里面有一个 cdnUrl 返回告诉当前文件上传完毕后的 Cdn 链接在哪里

```js
onFinish={async (value) => {
  const { question, files } = value;
  const FilesCdnList = files?.fileList.map(
    (file: any) => `![${file.name}](${file.response.cdnUrl})`,
    );
  const Prompt = `${question} ${FilesCdnList?.join('\n')}`;
  await onMessageSend(Prompt);
}}
```

### 非图片的内容支持

可以看到，本质上预览是依赖于 Markdown 的预览能力进行支持的，如果遇到了内容的文件，我们建议采用 `<a/>` 来进行渲染，然后使用 messageItemExtraRender 在下方进行额外文件的预览渲染

> 其实 Markdown 是支持 Html 渲染的，但是我们默认并没有开启这个能力，考虑各方面我们并不打算默认打开这个，我们建议你采用 messageItemExtraRender

```ts
messageItemExtraRender: (message: ChatMessage, type: 'assistant' | 'user') => React.ReactNode;
```

messageItemExtraRender 可以拿到当前的 message，可以做很多自定义渲染的工作。
