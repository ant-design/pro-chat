---
title: What is streaming output
order: 3
group:
title: Quick Start
  order: 2
---

# What is streaming output

## Brief Description

### What is streaming output

Streaming output, also known as streaming transmission, refers to the continuous pushing of data from the server to the client, rather than sending it all at once. In this mode, once the connection is established, the server can send updates to the client in real time.

### Usage Scenario

Typical application scenarios for streaming output include real-time message push, stock market updates, real-time notifications, etc. Any situation where the server needs to transmit data to the client in real time can be used.

### Differences from ordinary requests

Unlike traditional HTTP requests, which are based on a request-response model, where the client sends a request and the server responds and closes the connection immediately after processing, streaming output keeps the connection open, allowing the server to send multiple responses in succession.

How to create an SSE

### Java

In Java, you can use the Servlet API to implement Server-Sent Events. Here is a simple example:

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

In Python, you can use the Flask framework to implement Server-Sent Events. Here is an example:

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

Why does large model LLM need to use SSE?

In a sense, the current LLM model's adoption of SSE is a legacy of history.

The content before and after the Transformer needs to be reasoned and spliced, and the reasoning time will be very long (there is also a limit of Max Token). The reasoning context is also generated gradually, so the default is to stream the output for wrapping. If one day AI's speed can be free from these content restrictions, it may be a better interaction to return it all at once.

## How to Integrate ProChat with SSE

For non-streaming requests, you only need to return a String wrapped in Response.

For streaming requests, the component only cares about one thing, which is the returned String. Here is an example of the streaming return of Tongyi Qianwen.

```js
id:1
event:result
data:{"output":"null","text":"Recently","usage":"output_tokens":3,"input_tokens":85},"request_id":"1117fb64-5dd9-9df0-a5ca-d7ee0e97032d"}

id:2
event:result
data:{"output":{"finish_reason":"null","text":"The nearest park is the park, it"},"usage":{"output_tokens":11,"input_tokens":85},"request_id":"1117fb64-5dd9-9df0-a5ca-d7ee0e97032d"}

... ... ... ...
... ... ... ...

id:8
event:result
data: {"outputplified":"最近的一个公园是公园，它距离你的家大约1.5公里。你可以使用谷歌地图或者百度地图来查看具体的路线和距离。","usage":"输出令牌数：51， 输入令牌数： 85","request_id":"1117fb64-5dd9-9df0-a5ca-d7ee0e97032d"}
```

We need to assemble the Reader ourselves, read it, and then wrap it back, similar to this. The component will still receive a Stream containing only the returned content at the end.

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
          console.error('An error occurred while reading data from the stream', err);
          controller.error(err);
        });
    }
    push();
  },
});
return new Response(readableStream);
```

### Using a Third-Party Reader Parser Solution

In fact, the parameters of the large model SSE interface are almost the same as those of OpenAI, so is there a general solution for Reader parsing?

Of course, there is. Below is a pseudo-code that uses the Vercel npm package ai to parse and return the ChatGPT streaming interface, which handles it for us directly.

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

### Complete Code

See Github [ChatGPT-NextJs](https://github.com/ant-design/pro-chat/tree/main/demos/chatgpt-nextjs) for details

> Remember to configure the openai api-key (or forwarded address) in the api section after installing dependencies
