---
title: How to connect multi-modality
order: 19
group:
  title: Use Cases
nav:
  title: Documents
  order: 0
---

# How to connect multi-modality

At the beginning, we planned to directly enable InputArea (i.e. the input box below) to support uploading various files

But once designed like this, it will lead to more problems

- Should we directly convert the image to Base64 or Cdn? If it's Cdn, do we still need to provide a Cdn API for developers?
- What about other files besides the pictures? Do various files need to be previewed?
- How are these files concatenated into Prompt? How to define the position of this Prompt?

These design details are not very numerous, and for some models, they may not necessarily support multi-modality. Providing analysis by default is not a good design.

## Custom input section

We provide an API for inputAreaRender to help you support multi-modal situations, as well as integrate and interact with ProChat's data streams

```ts
  inputAreaRender?: (
    defaultDom: ReactNode,
    onMessageSend: (message: string) => void | Promise<any>,
    onClearAllHistory: () => void,
  ) => ReactNode;
```

inputAreaRender have three parameters：

- defaultDom ：The default rendering dom, if you want to wrap or add some small content, you can directly combine it on this basis
- onMessageSend ：The method of sending data, which is essentially the same as ProChat.sendMessage (Hooks), is used to send a data stream to ProChat
- onClearAllHistory ： The method of clearing the current conversation is essentially the same as ProChat.clearMessage (Hooks)

Now you can freely combine the current content and various requirements you plan to do, such as blocking some bad conversations, pre checking uploaded content, etc

## A demonstration case of uploading an image

<code src="./demos/inputAreaRender.tsx" ></code>

Let's break down this case in detail

### Using Base64 by default

In the case, Antd's Upload component was used, and we can easily obtain the Base64 of the current content, and then combine it in onMessageSend

If you want to replace Base64 with CDN, all you need to do is process it on the data stream.

> The following modification is based on the fact that if there is a response in the Actions interface of the Upload component configuration, there will be a cdnUrl return indicating where the Cdn link is after the current file is uploaded

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

### Non image content support

As can be seen, preview essentially relies on Markdown's preview ability for support. If encountering content files, we suggest using `<a/>` for rendering, and then using messageItem ExtraRender to preview and render additional files below

> In fact, Markdown supports HTML rendering, but we do not enable this feature by default. Considering various aspects, we do not intend to enable this by default. We suggest that you use messageItemExtraRender

```ts
messageItemExtraRender: (message: ChatMessage, type: 'assistant' | 'user') => React.ReactNode;
```

MessageItemExtraRender can retrieve the current message and perform many custom rendering tasks.
