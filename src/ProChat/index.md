---
nav: Components
group: Chat
title: ProChat
description: a Chat Solution
---

## Default

搭配 `request` 指定接口即可使用：

如果 `request` 为 url，入参格式要求：

```ts
interface Params {}
```

<code src="./demos/default.tsx" center></code>

### 自定义 request 请求

<code src="./demos/request.tsx" center></code>

## 设定初始会话消息

使用 `initialChats` 设定初始会话消息。

<code src="./demos/initialChats.tsx" center></code>

## 设定打招呼消息

通过 `helloMessage` 设定打招呼消息。

<code src="./demos/helloMessage.tsx" center></code>

## 加载中

使用 loading 字段控制加载中状态。适用于第一次加载数据时使用。

<code src="./demos/loading.tsx" center></code>

## 指定会话双方的头像、名称

ProChat使用 `meta` 来表意会话双方的头像、名称等信息。设定助手的头像、名称使用 `assistantMeta`，设定用户的头像、名称使用 `userMeta`。 使用 `showTitle` 显示名称。

<code src="./demos/meta.tsx" center></code>

## 🚧 悬浮窗使用

将 `ProChat` 组件作为会话解决方案

## 🚧 程序化控制消息发送

## APIs
