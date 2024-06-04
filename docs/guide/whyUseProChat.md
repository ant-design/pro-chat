---
title: 为什么要使用 ProChat
group:
  title: 快速上手
nav:
  title: 文档
  order: 0
---

# 为什么要使用 ProChat

能够触达到这里的同学，都是想看看 ProChat 是什么，以及可能会需要在业务中使用的情况。

我们抛开那些因为 AI 或者 LLM 火起来的前置原因，从一个前端开发者的角度来说这个问题。

## 大模型复杂的结构

大模型的结构不能说很复杂，只能说非常复杂，里面有很多人工智能的专有名词，想要一个前端开发者理解并学习里面的知识成本实在是太高了。

但是从「前端页面」这个角度出发，前端开发者其实最关心的是「对话」

详细的出入参数可见：[大模型入参介绍](../request-params-intro) [大模型出参介绍](../return-params-intro)

## ProChat 体验细节

### 默认的流式输出支持

由 ChatGPT 率先实现的流式输出在用户体验上远超传统的 HTTP 请求，SSE（Server Send Event）这项技术也可以说正式登上了主流技术圈的视野中。

ProChat 作为 AI 会话的前端解决方案，自然默认集成了这项流式输出的能力。只需要在 request 中配置一个返回流式文本的 Response （Web标准的 Response 对象），就可以轻松实现流式效果的集成。

效果如下

<img src="https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*0uQhSIzSS3YAAAAAAAAAAAAADmuEAQ/original" style="width:100%;">

而同样的，ProChat 的 request api 也兼容传统的非流式请求：

```js
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

const delay = (text: string) =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(text);
    }, 5000);
  });

export default () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        request={async (messages) => {
          const text = await delay(
            `这是一条模拟非流式输出的消息的消息。本次会话传入了${messages.length}条消息`,
          );
          return new Response(text);
        }}
        style={{ height: '300px' }}
        />
    </div>
  );
};

```

### 多种渲染支持

还有一点对前端来说比较头疼的在于「解析 - 渲染」

像是下面这种，如果你自己写，你需要对 String 部分的内容解析，然后决定哪些用什么渲染，我们已经帮你内置好了一些渲染器：Markdown 渲染、终端命令拼接、跳转链接等等常用的渲染器

<code src="./demos/doc-mode.tsx" ></code>

而针对多行代码块，我们则强化了代码块组件的交互能力，使之具有折叠展开、更换高亮语言等进阶功能，进而帮助你在日常使用 AI 大模型中更好地查看AI生成的代码。

<img src=" https://mdn.alipayobjects.com/huamei_re70wt/afts/img/A*e4JbQKfupVQAAAAAAAAAAAAADmuEAQ/original" style="width:100%;">

### 快速编辑、重试、更多能力

如果问错了问题？我想从某个地方开始，修改我之前的问题呢？或者我觉得他回复的不太好，后续的问题我希望帮他修改一下他的回答？

我们支持快速编辑、删除、重新生成这些能力，这些都是集成在 `ProChat` 这个组件中，开发者完全不需要有心智负担如何去实现这些能力，因为我们把这套数据流给你维护好啦！
