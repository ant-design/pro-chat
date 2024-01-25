---
title: Umi
group:
  title: 前端框架
  order: 51
nav:
  title: 文档
  order: 0
---

## 与 Umi 集成

在中后台的研发场景， [umi](https://umijs.org/) 是一个非常不错的选择。ProEditor 与 umi 的集成非常容易。安装后直接使用即可。

```bash
npx create-umi@latest
or
yarn create umi
pnpm dlx create-umi@latest
```

### 依赖安装

创建好后

```bash
npm install @ant-design/pro-chat --save
or
pnpm install @ant-design/pro-chat
```

### 使用

```js
import { useState, useEffect } from 'react';
import { ProChat } from '@ant-design/pro-chat';
export default () => (
  <ProChat
    style={{
      height: '100vh',
      width: '100vw',
    }}
    request={async (messages) => {
       helloMessage={
          '欢迎使用 ProChat ，我是你的专属机器人，这是我们的 Github：[ProChat](https://github.com/ant-design/pro-chat)'
        }
        request={async (messages) => {
          const mockedData: string = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
          return new Response(mockedData);
        }}
    }}
  />
);
```
