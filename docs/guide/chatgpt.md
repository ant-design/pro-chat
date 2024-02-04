---
title: ChatGPT
group:
  title: 模型案例
  order: 1000
nav:
  title: 文档
  order: 0
---

# OpenAI-ChatGPT

下面是一个最简单的 ChatGPT 接入方式，使用的是流式接口，非流式这里不做展示，可参考通义千问侧。

## 项目初始化

使用 NextJs 官方脚手架创建的项目

我们会借助 OpenAI 提供的 Npm 包来进行发送。使用 Vercel 的库来解析返回的数据流内容。因此你需要先安装这两个包

```bash
npm install ai --save
npm install openai --save

# or use yarn 、bun、pnpm any else
bun add ai
bun add openai
```

> 其余的 NextJs 配置参考通义千问 or 快速开始

## 接口编写

我们借助 Vercel 的库来解析 数据流，不需要自己手动配置 Reader

> 这里我们需要将 role 和 content 组合一下，因为 messages 包含的内容会更多一些，但是对于 ChatGPT 来说只需要这两个内容

```ts
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const POST = async (request: Request) => {
  const { messages = [] }: Partial<{ messages: Array<any> }> = await request.json();

  const openai = new OpenAI({
    apiKey: 'OpenAI Key',
    baseURL: 'base url',
  });

  const PickMessages = messages.map((message) => {
    return {
      role: message.role,
      content: message.content,
    };
  });

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [...messages],
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
};
```

## 界面

```ts
'use client';
import { useState, useEffect } from 'react'
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

export default function Home() {

  const theme = useTheme();
  const [showComponent, setShowComponent] = useState(false)

  useEffect(() => setShowComponent(true), [])

  return (
    <div
      style={{
        backgroundColor: theme.colorBgLayout,
      }}
    >
      {
        showComponent && <ProChat
          style={{
            height: '100vh',
            width: '100vw',
          }}
          request={async (messages) => {
            const response = await fetch('/api/qwen', {
              method: 'POST',
              body: JSON.stringify({ messages: messages }),
            });
            return response
            }}
        />
      }
    </div>
  );
}

```

### 完整的代码

详见 Github [ChatGPT-NextJs](https://github.com/ant-design/pro-chat/tree/main/demos/chatgpt-nextjs)

> 记得在安装完依赖后，去 api 的地方配置 openai 的 api-key（或者是转发的地址）
