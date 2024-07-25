---
title: 详解 api 核心 Request
group:
  title: 使用案例
  order: 10
nav:
  title: 文档
  order: 0
---

# 详解 api 核心 Request

首先要清楚，ProChat 中最核心的其实是数据维护方案。我们遵循 Data-Modal 数据渲染 UI 这一套逻辑

所以你也会发现，我们配置了 chatItemRenderConfig 来帮你完成 ProChat 中各个对话单元的渲染。

### 简单用法

对于简单的对话方式来说，最基本的 String 渲染即可，我们最开始在 Request 就是这么设计的。

```js
<ProChat
  request={async (messages) => {
    const text = await delay(
      `这是一条模拟非流式输出的消息的消息。本次会话传入了${messages.length}条消息`,
    );
    return new Response(text);
  }}
/>
```

因为要设计同时兼容 SSE 和普通的输出，我们渲染让用户把这条请求的 Response 返回给我们。

这样子就会遇到一个问题？如果用户要给某个数据流返回额外的信息呢？例如，他们想要控制 id、createTime 这些内容？甚至是 role（角色）

> 这几个参数都会在 ProChat 由程序默认帮你生成，role 默认是 user 和 assistant

这个时候我们虽然提供了一些 Hooks，例如 setMessageContent 可以帮你程序化的修改内容，难道用户还要每次自己手动改一改么？这显然不太好。

### 高级结构

我们设计了一个可以拓展的结构

```ts
export type MixRequestResponse = Response | { content?: Response; [key: string]: any } | string;
```

现在你可以这么使用它

```js
<ProChat
  request={async (messages) => {
    const text = await delay(
      `这是一条模拟非流式输出的消息的消息。本次会话传入了${messages.length}条消息`,
    );
    return {
      content: new Response(text),
      id: 'only-you-love-me',
      role: 'user-King',
      keys: ['Ovo'],
    };
  }}
/>
```

我们会读取你的对象，对象里面的 Content 我们依然照常给你放到数据流中，其他的结构我们则会一样给你塞进去，这里面就分为两种情况了。

- 如果塞入的键值对是框架原本打算给你生成的，例如 id、createAt、role 这一类，除了 id 这个字段外，其余的我们会使用你传入的来替换（id 是用于关键的搜索能力，我们会帮你保持唯一，或者请你使用 genMessageId 来写）
- 如果传入的不属于预生成的，我们也会额外塞入进去。

你会发现除了 id 外 ，其余的内容会额外传入进入。

> 你可能会注意 OriginData 里面还有一个 Meta 字段，这个是之前的老版本兼容方案，本质上外层和 Meta 数据是一致的，你选择哪一种都可以。

![](https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*QX7BR6hI6FYAAAAAAAAAAAAADmuEAQ/original)

### Signal 控制 & 额外参数

除此之外，request 入参除开第一个 messages 作为对话上下文外，还有两个参数

- extra: 额外参数内容，你可以通过 config 来进行配置，config 里面的 params 是一个额外字段，其他都是通用的 modal 参数，你可以选择使用，也可以不使用。一般会配合一些切换模型、模型参数面板等一起用
- signal: SSE 等网络请求控制，把这个传给 Http 请求，或者 fetch、request 等，这样子当你点击停止生成的时候，就会把网络请求给断开。（否则会出现明明点击了停止生成，前端不在继续生成了，但是接口没有断开的情况）

```js
<ProChat
  config={{
    params: {
      userId: '123',
      extra: 'extra',
    },
  }}
  request={async (messages, extra, signal) => {
    const text = await delay(
      `这是一条模拟非流式输出的消息的消息。本次会话传入了${messages.length}条消息`,
    );
    return {
      content: new Response(text),
      id: 'only-you-love-me',
      role: 'user-King',
      keys: ['Ovo'],
    };
  }}
/>
```
