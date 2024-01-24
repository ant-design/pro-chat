---
title: 核心 api Request 设计思路
group:
  title: 快速上手
order: 6
---

# 核心 api Request 设计思路

## 设计思路

### 一个 Request 为核心

使用过 [ProComponets](https://github.com/ant-design/pro-components) `ProTable` 的同学都知道，在 `ProTable` 中最核心的 `api` 就是 `Request`，发起一个请求，并返回数据渲染整个 `Table`，你在 `ProTable` 中把 Request 写上就相当于做完了一半的表格。

在 `ProChat` 中也是类似的。在大模型场景下，对于一个前端开发者来说，我们只会在乎「模型返回给我的是什么」我们可不想处理那么多奇奇怪怪的数据结构

## 出参设计

> 这是一个通义千问的返回内容示例

```json
{
  "requestId": "7a21407f-9f16-9ba0-a91b-df0bdd1cc5bb",
  "usage": { "input_tokens": 25, "output_tokens": 321 },
  "output": {
    "text": "好的，以下是一道简单易做的蔬菜炒饭的菜谱：\n\n材料：\n- 2 个白萝卜，削皮并切成小丁\n- 1 个土豆，削皮并切成小丁\n- 2 个茄子，削皮并切成小丁\n- 1 杯米饭\n- 2 个青椒，切成小丁\n- 1 个红椒，切成小丁\n- 2 汤匙酱油\n- 1 汤匙油\n- 盐和黑胡椒适量\n\n做法：\n1. 在锅中加入 2 汤匙油，加热至中高温。\n2. 加入白萝卜丁和土豆丁，翻炒至软化并略微焦黄。\n3. 加入茄子丁，继续翻炒至软化。\n4. 加入米饭，翻炒均匀，让米粒散开。\n5. 加入青椒丁和红椒丁，继续翻炒约2-3分钟，直到蔬菜变软和略微焦黄。\n6. 加入酱油，盐和黑胡椒，再翻炒均匀，使所有材料均匀地涂上酱油和调料。\n7. 把炒饭盛到碗里，配上一碗清汤或者鱼汤，即可开始享用。",
    "finish_reason": "stop"
  }
}
```

对于我们来说，或者换句话说，对于有类似对话类需求的业务来说，我们应该只在乎这一句返回的话。（特殊情况除外）

因此 Request 我们设计为返回有且只是一个 String

因此你只需要将返回 Response 里面的当前着一条 String 拿出来即可。

```js
<ProChat
  request={async (messages) => {
    const response = await QwChat(messages);
    return new Response(response?.output?.text);
  }}
/>
```

> 在流式和非流式我们都只关心 String，但是对于处理手法不太一样，详情可见组件案例

## 入参设计

那么入参呢？

这是通义千问的大模型入参，可以看到参数非常多，而且不同的模型入参是不太一样的，做组件的时候是要考虑到平衡的。

经过权衡，我们最终将入参数的结构设计为如下的结构

```typescript
/**
 * ChatRequest是一个函数类型，表示对聊天API的请求。
 * 它接受ChatMessage对象数组和ModelConfig对象作为参数，并返回一个Promise，该Promise在解析时返回一个Response对象。
 */
export type ChatRequest = (messages: ChatMessage[], config: ModelConfig) => Promise<Response>;

/**
 * 表示具有可选泛型额外数据的聊天消息对象。
 */
export interface ChatMessage<T extends Record<string, any> = Record<string, any>> {
  role: ModelRoleType | string; // 发送消息者的角色。
  content: ReactNode; // 消息内容，可以呈现为ReactNode。
  error?: any; // 与消息相关的可选错误信息。
  model?: string; // 与消息关联的模型。
  name?: string; // 发送消息者的名称。
  parentId?: string; // 如果这是对另一条消息的回复，则为父级消息的ID。
  createAt: number; // 消息创建时间戳。
  id: string; // 消息的唯一标识符。
  updateAt: number; // 消息最后更新时间戳。
  extra?: T; // 消息关联的可选泛型额外数据。
}

/**
 * 表示用于聊天功能中模型配置选项。
 */
export interface ModelConfig {
  compressThreshold?: number; // 启用时压缩消息的阈值。
  enableCompressThreshold?: boolean; // 是否启用压缩阈值标志。
  enableHistoryCount?: boolean; //是否启用历史计数标志。
  enableMaxTokens?: boolean; //是否启用最大令牌限制标志。
  fewShots?: LLMFewShots; //语言模型学习少量样本配置
  historyCount?: number; // 聊天消息最大历史记录数.
  inputTemplate?: string; //根据用户输入生成消息的输入模板
  model?: string; //在聊天功能中使用的模型名称或标识符
  params?: ModelParams; //特定于聊天功能中使用的模型附加参数
  systemRole?: string; //系统分配角色
}
```

第一个参数 messages 是最关键的，当前对话的上下文，里面 role 和 content 是最关键的，几乎所有大模型需要的最基本的内容也就是这两个，其余参数也是大部分模型可能会用得到的。

第二个参数则是一些模型相关的参数，有些时候你会需要将其配置并发送给模型。
