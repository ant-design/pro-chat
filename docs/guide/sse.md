---
title: 什么是流式输出？
order: 3
group:
  title: 快速上手
  order: 2
---

# 什么是流式输出？

## 简述

### 什么是流式输出

流式输出，也称为流式传输，指的是服务器持续地将数据推送到客户端，而不是一次性发送完毕。这种模式下，连接一旦建立，服务器就能实时地发送更新给客户端。

### 使用场景

流式输出的典型应用场景包括实时消息推送、股票行情更新、实时通知等，任何需要服务器向客户端实时传输数据的场合都可以使用。

### 与普通请求的区别

与传统的HTTP请求不同，普通请求是基于请求-响应模型，客户端发送请求后，服务器处理完毕即刻响应并关闭连接。流式输出则保持连接开放，允许服务器连续发送多个响应。

## 如何创建一个 SSE

### Java

在Java中，可以使用Servlet API来实现Server-Sent Events。以下是一个简单的示例：

```java
@WebServlet("/stream-sse")
public class SseServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/event-stream");
        response.setCharacterEncoding("UTF-8");

        PrintWriter writer = response.getWriter();
        for (int i = 0; i < 10; i++) {
            writer.write("data: " + System.currentTimeMillis() + "\n\n");
            writer.flush();
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        writer.close();
    }
}
```

### Python

在Python中，可以使用Flask框架来实现Server-Sent Events。以下是一个示例：

```python
from flask import Flask, Response
import time

app = Flask(__name__)

@app.route('/stream-sse')
def stream():
    def generate():
        for i in range(10):
            yield f"data: {time.time()}\n\n"
            time.sleep(1)
    return Response(generate(), mimetype='text/event-stream')

if __name__ == '__main__':
    app.run(threaded=True)
```

## 为什么大模型 LLM 需要使用 SSE ？

从某种意义上说，现阶段 LLM 模型采用 SSE 是历史遗留原因。

Transformer 前后内容是需要推理拼接的，且不说内容很多的时候，推理的时间会很长（还有 Max Token 的限制）。推理上下文的时候也是逐步推理生成的，因此默认就是流式输出进行包裹。如果哪天 AI 的速度可以不受这些内容的限制了，可能一次性返回是一个更好的交互。

## ProChat 如何接入 SSE

对于非流式的请求，只需要返回一个进过 Response 包装的 String 即可。

对于流式请求来说，组件其实只关心一个内容，那就是返回的 String，下面是通义千问的流式返回案例。

```js
id:1
event:result
data:{"output":{"finish_reason":"null","text":"最近"},"usage":{"output_tokens":3,"input_tokens":85},"request_id":"1117fb64-5dd9-9df0-a5ca-d7ee0e97032d"}

id:2
event:result
data:{"output":{"finish_reason":"null","text":"最近的公园是公园，它"},"usage":{"output_tokens":11,"input_tokens":85},"request_id":"1117fb64-5dd9-9df0-a5ca-d7ee0e97032d"}

... ... ... ...
... ... ... ...

id:8
event:result
data:{"output":{"finish_reason":"stop","text":"最近的公园是公园，它距离你的家大约1.5公里。你可以使用Google地图或者百度地图来查看具体的路线和距离。"},"usage":{"output_tokens":51,"input_tokens":85},"request_id":"1117fb64-5dd9-9df0-a5ca-d7ee0e97032d"}
```

我们需要自己组装 Reader 然后读取它，然后包裹他返回，类似这样子。组件最后接收的依然是一个只包含返回内容的 Stream 流。

```js
const readableStream = new ReadableStream({
  async start(controller) {
    function push() {
      reader
        .read()
        .then(({ done, value }) => {
          if (done) {
            controller.close();
            return;
          }
          const chunk = decoder.decode(value, { stream: true });
          const message = chunk.replace('data: ', '');
          const parsed = JSON.parse(message);
          controller.enqueue(encoder.encode(parsed.choices[0].delta.content));
          push();
        })
        .catch((err) => {
          console.error('读取流中的数据时发生错误', err);
          controller.error(err);
        });
    }
    push();
  },
});
return new Response(readableStream);
```

### 使用三方 Reader 解析器解决方案

其实大模型 SSE 接口参数都是大差不差的，都是和 OpenAI 类似的内容，所以有没有通义的 Reader 解析解决方案呢？

当然是有的，下面是一个使用了 Vercel Npm 包 ai 来解析返回 ChatGPT 流式接口的伪码，直接帮我们处理好了。

```js
import { ProChat } from "@ant-design/pro-chat";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { useTheme } from "antd-style";

const openai = new OpenAI({
  apiKey: "OpenAI-Key",
});

export default function Home() {
  const theme = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.colorBgLayout,
      }}
    >
      <ProChat
        style={{
          height: "100vh",
          width: "100vw",
        }}
        request={async (messages: Array<any>) => {
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [...messages],
            stream: true,
          });
          const stream = OpenAIStream(response);
          return new StreamingTextResponse(stream);
        }}
      />
    </div>
  );
}

```

### 完整的代码

详见 Github [ChatGPT-NextJs](https://github.com/ant-design/pro-chat/tree/main/demos/chatgpt-nextjs)

> 记得在安装完依赖后，去 api 的地方配置 openai 的 api-key（或者是转发的地址）
