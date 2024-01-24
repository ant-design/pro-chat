---
title: 大模型出参介绍
group:
  title: 快速上手
order: 5
---

# 大模型出参介绍

## 市面上的大模型概览

在人工智能领域，LLM（Large Language Models）指的是被训练来处理、理解和生成自然语言文本的大规模机器学习模型。目前市面上知名的LLM主要包括：

- **OpenAI 的 GPT 系列**：GPT-3 是最为人所知的一个版本，以其强大的自然语言处理能力而闻名。
- **Google 的 BERT**：BERT 专注于理解单词与其他单词之间的关系。

这些模型通常通过API形式提供服务，允许开发者向模型发送请求并接收响应数据。

## 大模型返回结构及 ChatGPT 示例

### 返回参数描述

当我们向一个LLM发送请求时，我们会得到一个包含多个字段的JSON格式响应。这些字段通常包含以下信息：

- `id`：唯一标识符，用于跟踪特定请求或对话。
- `object`：通常指示响应类型，如命令输出、聊天回复等。
- `created`：创建时间戳，表示响应生成时间。
- `model`：使用的模型名称和版本。
- `choices`：包含了一个或多个选项对象（outputs），每个对象都代表了可能的回答或结果。

### ChatGPT 返回示例

假设我们使用 OpenAI 提供的 ChatGPT API 发送了一条消息，并收到以下JSON格式响应作为示例：

```json
{
  "id": "cmpl-example",
  "object": "text_completion",
  "created": 1616510934,
  "model": "gpt-3.5-turbo",
  "choices": [
    {
      "text": "\nThis is a response from the model.",
      "index": 0,
      "logprobs": null,
      "finish_reason": "length"
    }
  ]
}
```

### 参数解析

在此示例中：

- `id` 表明该次交互有一个特定标识符："cmpl-example"。
- `object` 显示这是一个文本补全类型："text_completion"。
- `created` 描述了这个回复是在何时创建："1616510934" （UNIX 时间戳格式）。
- `model` 标记使用了何种AI模型："gpt-3.5-turbo"。
- 在 `choices` 数组中：
  - `text` 字段提供了由模型生成的文本内容；
  - `index`: 表明当前选择在数组中索引位置；
  - 如果有配置，则用于显示每个token概率等信息；
  - 最后根据不同条件结束输出流程。

## 流式 VS 非流式 API 接口

### 流式接口

流式接口可以连续地发送和接收数据。在这种情况下，返回参数可能会包括某些额外信息来标记数据流状态：

```json
{
  ...
  "finish_reason": null,
  "finish_reason": "complete", // complete 代表 SSE 请求完毕
}
```

例如，在持续对话场景里，`finish_reason` 如果返回 `null` 则代表还没结束，`complete` 代表 `SSE` 请求完毕

> 有关 SSE 流式接口的请参考 [什么是流式输出？](./sse.md)

### 非流式接口

非流式接口通常意味着一次请求只返回一次完整响应。以上面ChatGPT返回示例为准则，在非流式接口中没有 `finish_reason` 之类字段因为不需要连续交互。

> 例如这里有一个通义千问的普通非流式请求接口，如下

```json
{
  "status_code": 200,
  "request_id": "05dc83af-7185-9e14-9b0b-4466de159d6a",
  "code": "",
  "message": "",
  "output": {
    "text": null,
    "finish_reason": null,
    "choices": [
      {
        "finish_reason": "stop",
        "message": {
          "role": "assistant",
          "content": "首先，准备两个鸡蛋，一个西红柿，适量的盐、糖、料酒和生抽。将鸡蛋打入碗中，搅拌均匀，西红柿切块。锅中加油，油热后加入鸡蛋液，炒至金黄色，盛出备用。锅中加油，油热后加入西红柿块，翻炒均匀，加入适量的盐、糖、料酒和生抽，炒至西红柿软烂，加入炒好的鸡蛋，翻炒均匀即可。"
        }
      }
    ]
  },
  "usage": {
    "input_tokens": 12,
    "output_tokens": 98,
    "total_tokens": 110
  }
}
```
