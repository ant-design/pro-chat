---
title: Umi
group:
  title: Frontend framework
  order: 51
nav:
  title: Documents
  order: 0
---

## Integrate with umi

In the R&D scenario of the backend, [umi](https://umijs.org/)It is a very good choice. The integration of ProChat and umi is very easy. After installation, it can be used directly.

```bash
npx create-umi@latest
or
yarn create umi
pnpm dlx create-umi@latest
```

### Installation dependencies

After creation

```bash
npm install @ant-design/pro-chat --save
or
pnpm install @ant-design/pro-chat
```

### Usage

```js
import { useState, useEffect } from 'react';
import { ProChat } from '@ant-design/pro-chat';
export default () => (
  <ProChat
    style={{
      height: '100vh',
      width: '100vw',
    }}
    helloMessage={
      '欢迎使用 ProChat ，我是你的专属机器人，这是我们的 Github：[ProChat](https://github.com/ant-design/pro-chat)'
    }
    request={async (messages) => {
      const mockedData: string = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
      return new Response(mockedData);
    }}
  />
);
```
