---
title: NextJs
group:
  title: Frontend framework
  order: 50
nav:
  title: Documents
  order: 0
---

## Integration with Next.js

[Next.js](https://nextjs.org/) is a very popular development framework in the community. Integrating ProChat with Next.js is also very easy.

### Create Project with Official Scaffold

```bash
pnpm dlx create-next-app@latest
```

### Install Dependencies

```bash
pnpm add @ant-design/pro-chat antd-style antd
```

### Usage

Next, use it just like any other component.

If you are using a project created with the default scaffold, you can see ProChat by writing the following code directly in `page.tsx`.

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

### Frequently Asked Questions

If you encounter issues with module imports or syntax errors during use, the primary reasons are:

- Next.js is an isomorphic React framework for both CSR and SSR. The code execution environment includes both the browser and Node.js.

- Both @ant-design/pro-chat and its underlying dependency @ant-design/pro-editor use the [Bundless](https://github.com/umijs/father/blob/master/docs/guide/build-mode.md) build mode of father, and only provide ESModule outputs.

- Therefore, there may be ESModule syntax incompatibility issues, and additional transpile and bundle processing for related dependencies may be required.

### Solutions

It is recommended to use pnpm instead of npm as the package manager, as some issues can be resolved with the resolution of ghost dependencies.

- Next.js version >= v13.0.0 (Recommended)

Add the dependencies that cause errors to the [transpilePackages](https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages) configuration item, such as:

```js
const nextConfig = {
  transpilePackages: [
    // Add as needed based on actual situation
    'shiki',
    '@ant-design/pro-chat',
    '@ant-design/pro-editor',
  ],
};
```

- Next.js version < v13.0 (Not Recommended)

Install the [next-transpile-modules](https://github.com/martpie/next-transpile-modules) plugin and configure the dependencies that need to be transpiled, such as:

```js
const withTM = require('next-transpile-modules')([
  // Refer to the plugin documentation for specific usage
  '.pnpm/node_modules/@ant-design/pro-editor',
  '@ant-design/pro-chat',
]);
module.exports = withTM({});
```

Due to an [issue](https://github.com/vercel/next.js/issues/19936) in older versions of Next.js where global CSS cannot be imported from node_modules, the involved dependencies also need to be configured in the plugin.
