---
title: Tongyi Qianwen
group:
  title: Model Case
  order: 7
nav:
  title: Documents
  order: 0
---

# Tongyi Qianwen & quick access

The following is the simplest way to access the general meaning of Qianwen

## Project initialization

Projects created using the official scaffolding of NextJs

```bash
npx  create-next-app@latest
```

Modify the `transpilePackages` in `next.config.(m)js` to add relevant dependencies

> In the latest version of NextJS 14 AppRoute, configuration is not required

```ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@ant-design/pro-chat',
    'react-intersection-observer',
  ],
};
module.exports = nextConfig;
```

## Key application for Tongyi Qianwen

First, you need to apply for the Dashscope service on Alibaba Cloud, [Activate and obtain API-Key](https://help.aliyun.com/zh/dashscope/developer-reference/activate-dashscope-and-create-an-api-key)

## Qwen Interface

Create api/qwen/route.ts under the App

> App Routes mode of NextJs 14 is used here. If using Page Routes, please check the NextJs official website

```ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { messages = [] }: Partial<{ messages: Array<any> }> = await request.json();
  try {
    const apiKey = 'Your—Api-Key'; // Your API key
    const response = await fetch(
      'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen-turbo',
          input: {
            messages: [
              {
                role: 'system',
                content: 'You are a helpful assistant.',
              },
              ...messages,
            ],
          },
          parameters: {},
        }),
      },
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
```

## Interface Writing

Write ProChat on the page you want to write and splice the corresponding content

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
            const data = await response.json();
            return new Response(data.output?.text);
          }}
        />
      }
    </div>
  );
}

```

### Complete Code

See Github [Qwen-NextJs](https://github.com/ant-design/pro-chat/tree/main/demos/qwen-nextjs) for details

> Remember to configure the api-key for Tongyi Qianwen in the api section after installing the dependencies
