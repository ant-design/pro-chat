---
title: 自定义样式
order: 20
group:
  title: 使用案例
nav:
  title: 文档
  order: 0
---

## 自定义样式

整体对于 ProChat 来说，因为使用了 AntDesign 组件和设计，风格上是保持统一的

同时我们也支持不同程度的自定义样式

### 输入框区域样式

inputAreaProps 允许你给输入框透传 Props（即 antd Input.Area 支持的 Props），里面可以穿入 ClassName 或 Style 来修改样式。

下面我改动了输入框的边框颜色和字体颜色

<code src="./demos/styles-inputarea.tsx" ></code>

### 对话记录样式

我们有一个 chatItemRenderConfig 方法，可以让你自定义对话的所有内容，这个 api 很强大，涉及到对话内容的渲染都会走到这里，头像、内容区域、操作区域都可以进行魔改

下面我单独给内容区包裹了一个蓝色边框 border

<code src="./demos/styles-chatitem.tsx" ></code>

### 使用 ClassName 样式覆盖

这个是最简单最方便的样式覆盖方法，我们给很多地方添加了 ClassName，你只需要打开 devtools 就可以看到一些名称

> 注意：如果你发现这个 ClassName 看上去不像是一个正常的类名，说明这类用的是 Hash 的 ClassName，会动态变化，请不要覆盖这一类类名

下面的这个案例中我使用 antd-styles（一个 antd 的 css-in-js 企业级解决方案）来对内容区域的背景做了样式覆盖

<code src="./demos/styles-className.tsx" ></code>

### 主题定制

如果你想要全局的样式定制，例如想要利用到 antd 的自定义主题、算法能力，我们结合 antd-styles 在下面提供这样一套代码，详情的使用可见 [antd-styles](https://ant-design.github.io/antd-style/zh-CN/guide)

<code src="./demos/styles-darkmode.tsx" ></code>
