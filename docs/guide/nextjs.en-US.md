---
title: NextJs
group:
  title: Frontend framework
  order: 50
nav:
  title: Documents
  order: 0
---

## Integrate with Next.js

[Next.js](https://nextjs.org/) is a very popular research and development framework in the community. The integration of ProChat and Next.js is also very easy.

```bash
npx create-next-app@latest
```

### Dependent installation

```bash
npm install @ant-design/pro-chat --save
or
pnpm install @ant-design/pro-chat
```

Due to Next.js being a CSR, SSR isomorphic React framework, and ProChat only providing the ESM module by default, after installation, it is necessary to go to ` next.config. ' (m) Add relevant dependencies to 'transpilePackages' in JavaScript:

> In the latest version of NextJS 14 AppRoute, configuration is no longer required

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Convert pure ESM modules to node compatible modules
  transpilePackages: [
    '@ant-design/pro-chat',
    'react-intersection-observer',
  ],
};
```

### Usage

Next, use it the same as other components.

If you are in a project created by default scaffolding, simply write the following code in 'page. js | tsx' to see ProChat.

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
            "Welcome to ProChat, I am your exclusive robot, this is our Github：[ProChat](https://github.com/ant-design/pro-chat)"
          }
          request={async (messages) => {
            const mockedData: string = `This is a simulated conversation data. ${messages.length} messages were passed in this session`;
            return new Response(mockedData);
          }}
        />
      )}
    </div>
  );
}
```

> A more complete demo can view the Case in the model case [Model Case - ChatGPT](./chatgpt.md)
