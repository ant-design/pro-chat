---
title: ChatGPT
group:
  title: Model Case
  order: 1000
nav:
  title: Documents
  order: 0
---

# OpenAI-ChatGPT

The following is the simplest ChatGPT access method, which uses a streaming interface. Non streaming interfaces will not be shown here, please refer to the Tongyi Qianwen side.

## Project initialization

A project created using NextJs

We will use the Npm package provided by OpenAI for sending. Use Vercel's library to parse the returned data stream content. So you need to install these two packages first

```bash
npm install ai --save
npm install openai --save

# or use yarn 、bun、pnpm any else
bun add ai
bun add openai
```

> For the remaining NextJs configurations, refer to Tongyi Qianwen or Quick Start

## Interface Coding

We use Vercel's library to parse data streams without the need to manually configure the Reader ourselves

> We need to combine role and content here because messages contain more content, but for ChatGPT, only these two contents are needed

```ts
import { createOpenAI } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';

export async function POST(request: Request) {
  const { messages = [] }: Partial<{ messages: Array<any> }> = await request.json();

  const PickMessages = messages.map((message) => {
    return {
      role: message.role,
      content: message.content,
    };
  });

  const openai = createOpenAI({
    // custom settings, e.g.
    apiKey: 'OpenAI Key', // your openai key
    baseURL: 'base url', // if u dont need change baseUrl，you can delete this line
    compatibility: 'compatible',
  });
  const stream = await streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [...PickMessages],
  });
  return new StreamingTextResponse(stream.textStream);
}
```

## UI

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

### Complete code

See Github [ChatGPT-NextJs](https://github.com/ant-design/pro-chat/tree/main/demos/chatgpt-nextjs)

> Remember to configure the API API's API key (or forwarding address) for OpenAI after installing the dependencies
