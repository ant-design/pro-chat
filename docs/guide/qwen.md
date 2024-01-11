---
title: 通义千问
group:
  title: 模型案例
  order: 5
nav:
  title: 文档
  order: 0
---

# 通义千问 & 快速接入

下面是一个最简单的通义千问接入方式

## 项目初始化

使用 NextJs 官方脚手架创建的项目

```bash
npx create-next-app@latest
```

修改 `next.config.(m)js` 中 `transpilePackages` 中加入相关依赖

```ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@ant-design/pro-editor',
    '@ant-design/pro-chat',
    'zustand',
    'react-intersection-observer',
    'leva',
  ],
};
module.exports = nextConfig;
```

## 通义千问 Key 申请

首先你要去阿里云申请灵积服务，[开通并获取 API-Key](https://help.aliyun.com/zh/dashscope/developer-reference/activate-dashscope-and-create-an-api-key)

## Qwen 接口

在 App 下方创建 api/qwen/route.ts

> 这里使用的 NextJs 14 的 App Routes 模式，如果是采用 Page Routes 请查看 NextJs 官网

```ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { messages = [] }: Partial<{ messages: Array<any> }> = await request.json();
  try {
    const apiKey = 'xxxxxxx'; // 你的 API 密钥
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

## 界面编写

在你想要编写的页面上写入 ProChat 并拼接对应内容

```ts
"use client";

import { useTheme } from "antd-style";
import { ProChat } from "@ant-design/pro-chat";

export default function Home() {
  const theme = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.colorBgLayout,
      }}
    >
      <ProChat
        style={{
          height: "100vh",
          width: "100vw",
        }}
        request={async (messages) => {
          const response = await fetch("/api/qwen", {
            method: "POST",
            body: JSON.stringify({ messages: messages }),
          });
          const data = await response.json();
          return new Response(data.output?.text);
        }}
      />
    </div>
  );
}

```

### 完整的代码

详见 Github [Qwen-NextJs](https://github.com/ant-design/pro-chat/tree/main/demos/qwen-nextjs)
