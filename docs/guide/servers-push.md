---
title: 服务端推送的方式
order: 20
group:
  title: 使用案例
nav:
  title: 文档
  order: 0
---

## 服务端推送的方式

很多时候，我们会需要一些服务端推送的场景，例如：

- 使用 Token 上限了，需要提示用户去充值
- 有一些背后调用了 FunctionCall 会执行很久，执行结束后 Push 一条内容

这种情况下和普通的 Request 或 SSE 有些不一样，甚至触发时机都不一定和对话请求有关

这个问题可以简化为：

- 如何 发送/接收 一条内容（时机不确定）

ProChat 在这种情况下很灵活，我们提供几种方法来帮助你

### 受控模式

在这个案例里面，我们等待 3s 后主动推送了一条通知，然后通过 chatList 进行受控放到了最后一条内容中

> 这个案例里面我们还使用了 chatItemRenderConfig 里面的 render 自定义了一条特殊格式的信息，关于这个 api 的更多信息可见[深度自定义对话内容](./chatItemRenderConfig.md)

<code src="./demos/controled-servers-push.tsx" ></code>

### Hooks sendMessage

> working on Progress
