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

### 官方脚手架创建项目

```bash
pnpm dlx create-next-app@latest
```

### 依赖安装

```bash
pnpm add @ant-design/pro-chat antd-style antd
```

### 使用

接下来和其他组件一样使用即可。

如果你是默认脚手架创建出来的项目中，直接在 `page.tsx` 中写下如下代码就可以看到 ProChat 了。

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

### 常见问题

如果使用过程中，出现模块的导入问题或语法报错，核心原因是：

- Next.js 是一个 CSR、SSR 同构的 React 框架。代码执行环境不仅有浏览器也有 Node.js。

- 不论是 @ant-design/pro-chat 还是其底层依赖 @ant-design/pro-editor，都采用了 father 的 [Bundless](https://github.com/umijs/father/blob/master/docs/guide/build-mode.md) 构建模式，且仅提供 ESModule 产物。

- 因此可能出现 ESModule 语法不兼容问题，此时需要对相关依赖进行额外的 transpile 和 bundle 处理。

### 解决方案

包管理工具推荐使用 pnpm 而不是 npm，部分问题可以随着幽灵依赖的解决而解决。

#### Next.js 版本 >= v13.0.0（推荐）

将报错的依赖添加到 [transpilePackages 配置项](https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages)中，如：

```js
const nextConfig = {
  transpilePackages: [
    // 根据实际情况按需添加
    'shiki',
    '@ant-design/pro-chat',
    '@ant-design/pro-editor',
  ],
};
```

#### Next.js 版本 < v13.0（不推荐）

安装 [next-transpile-modules 插件](https://github.com/martpie/next-transpile-modules)，配置需要 transpile 的依赖，如：

```js
const withTM = require('next-transpile-modules')([
  // 具体使用参考插件文档
  '.pnpm/node_modules/@ant-design/pro-editor',
  '@ant-design/pro-chat',
]);
module.exports = withTM({});
```

由于旧版本的 Next.js 存在无法从 node_modules 中导入全局 CSS 的[问题](https://github.com/vercel/next.js/issues/19936)，因此也需要将涉及的依赖配置到插件中。
