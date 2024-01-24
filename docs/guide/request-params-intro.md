---
title: 大模型入参介绍
group:
  title: 快速上手
order: 4
---

# 大模型入参介绍

## 大模型输入参数概述

在使用大型语言模型（LLM）时，输入参数对于确定如何处理请求和生成响应至关重要。这些参数帮助定义用户的询问意图、输出的详细程度以及交互方式等。

### 常见输入参数类型

以下是一些常见的输入参数类型：

- `prompt`：用户提供给模型的文本指令或问题。
- `max_tokens`：指定模型返回的最大token数量。
- `temperature`：控制输出多样性的参数，较高值导致更多随机性。
- `top_p`：与temperature结合使用，进一步控制创造性。
- `frequency_penalty`：降低重复内容出现频率。
- `presence_penalty`：鼓励模型引入新话题和概念。

## ChatGPT 输入示例

### 示例代码比较

以下是一个最简单的 ChatGPT API 调用示例：

> 下面是 NodeJS 的调用方式，想查看 curl 和 Python 的方式可以直接访问 OpenAI 文档即可 [QuickStart](https://platform.openai.com/docs/quickstart?context=python)

```js
import OpenAI from 'openai';

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
    model: 'gpt-3.5-turbo',
  });
}
```

### 参数描述和解析

在此示例中：

- `messages`: 这是一个数组，其中包含要发送给模型的消息对象。每个消息对象都有以下两个属性：

  - `role`: 表示消息的发送者角色。在这个例子中，只有一条消息，并且其角色被设置为 `"system"`。这表明这条消息来自系统或环境上下文。
  - `content`: 包含实际消息内容的字符串。在此例子中，内容是 `"You are a helpful assistant."`。

- `model`: 这指定了 OpenAI 使用哪个 AI 模型来处理请求并生成回应。在此示例中使用的模型是 `"gpt-3.5-turbo"`。

这是最简单的参数和内容，实际上模型支持的参数会非常的多。我们来看一个复杂的请求参数包含：

```js
import OpenAI from "openai";
const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
    prompt="Write a story about a dragon who loves baking cookies:",
    max_tokens=150,
    temperature=0.7,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
  });
}
```

在此示例中：

- `model`: 指定所使用的具体LLM版本，例如："gpt-3.5-turbo"。
- `prompt`: 提供了启动对话或任务需求说明："Write a story about a dragon who loves baking cookies:"。
- `max_tokens`: 定义了输出文本长度上限："150" tokens。
- `temperature`: 设定了结果多样性："0.7" 表明既不是完全随机也不是完全确定性。
- `top_p`: 结合temperature使用，这里设置为 "1" 表明没有额外限制除非与其他值结合使用。
- `frequency_penalty` 和 `presence_penalty` 都设置为 "0" 意味着不调整重复内容或新颖内容出现概率。

更加复杂的参数可见：[OpenAI-ChatGPT:Request Body ](https://platform.openai.com/docs/api-reference/chat)

## 流式 VS 非流式 API 输入差异

### 流式接口输入特点

在流式接口中，我们可以连续发送数据片段作为输入，并且通常会有一个字段来表示是否保持连接状态：

```json
{
  ...
  "stream": true,
}
```

通过将“stream”设置为true，我们告诉API我们预期会有后续信息传送。

### 非流式接口输入特点

相反，在非流式接口中通常只发送一次完整请求，并期待一次完整响应。因此，在非流式场景下无需特别指明保持连接状态。
