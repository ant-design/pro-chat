---
title: NextJs
group:
  title: 前端框架
  order: 50
nav:
  title: 文档
  order: 0
---

## 与 Next.js 集成

[Next.js](https://nextjs.org/) 是社区中非常流行的研发框架。ProChat 与 Next.js 的集成也非常容易。

```bash
npx create-next-app@latest
```

### 依赖安装

```bash
npm install @ant-design/pro-chat --save
or
pnpm install @ant-design/pro-chat
```

由于 Next.js 是一个 CSR、SSR 同构的 React 框架，而 ProChat 默认只提供 esm 模块，因此在安装后，需要在 `next.config.(m)js` 中 `transpilePackages` 中加入相关依赖：

> 在最新版本 NextJS 14 AppRoute 中可以不需要配置了

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 将纯 esm 模块转为 node 兼容模块
  transpilePackages: [
    '@ant-design/pro-chat',
    'react-intersection-observer',
    '@ant-design/pro-editor',
  ],
};
```

### 使用

接下来和其他组件一样使用即可。

如果你是默认脚手架创建出来的项目中，直接在 `page.js|tsx` 中写下如下代码就可以看到 ProChat 了。

```js
"use client";
import { useState, useEffect } from "react";
import { ProChat } from "@ant-design/pro-chat";
import { useTheme } from "antd-style";

export default function Home() {
  const theme = useTheme();
  const [showComponent, setShowComponent] = useState(false);
  useEffect(() => setShowComponent(true), []);
  return (
    <div
      style={{
        backgroundColor: theme.colorBgLayout,
      }}
    >
      {showComponent && (
        <ProChat
          style={{
            height: "100vh",
            width: "100vw",
          }}
          helloMessage={
            "欢迎使用 ProChat ，我是你的专属机器人，这是我们的 Github：[ProChat](https://github.com/ant-design/pro-chat)"
          }
          request={async (messages) => {
            const mockedData: string = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
            return new Response(mockedData);
          }}
        />
      )}
    </div>
  );
}
```

> 更加完整的 Demo 可以查看模型案例中的 Case [模型案例 - ChatGPT](./chatgpt.md)
