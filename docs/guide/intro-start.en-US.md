---
title: Get Started
group:
  title: Get Started
  order: 0
nav:
  title: Documents
  order: 0
---

# Get started

ProEditor is positioned as a component library for the front-end to quickly build dialogue content in Chat conversation mode

## Install

```bash
# @ant-design/pro-editor based on antd and antd-style，which need to be installed in the project
$ npm install antd antd-style -S
$ npm install @ant-design/pro-chat -S
```

Due to the underlying dependency on antd, there are version requirements

```json
"peerDependencies": {
  "antd": "^5",
  "antd-style": "^3",
  "react": "^18"
},
```

### Using ProChat components

The most critical component provided by ProChat is the ProChat component, which you can easily use.

<code src="./demos/base.tsx" ></code>

### 🚧 Using atomization ability

> Working in Progress At present, this part of the capability is still under high-speed development, please stay tuned。

ProChat will provide a series of atomized components in the future. In special cases, you may want to use some independent components in ProChat. We will also provide similar components to help you better build applications.

If you have more ideas and needs，Welcome to [Issue](https://github.com/ant-design/pro-chat/issues) and contact us on [Discussions](https://github.com/ant-design/pro-chat/discussions)

> Our next plan is to provide a complex model parameter panel: Welcome to watch [「RFC」New Component：ModalConfig Model Parameters Panel](https://github.com/ant-design/pro-chat/discussions/58)

Some of the underlying components, such as Markdown, Highlight, etc., we rely on the [ProEditor UI Component Library](https://github.com/ant-design/pro-editor)So if you also have a scenario of building an editor, you can come here to take a look.

## Engineering capability

### On demand loading

ProChat supports tree Shaking based on ES modules by default, directly introducing `import {ProChat} from' @ ant design/pro chat` ; There will be an on-demand loading effect.

### TypeScript

ProChat is developed using TypeScript, thus providing a complete type definition.
