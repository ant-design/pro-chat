/**
 * compact: true
 * title: SSE
 */
import { ProChat } from '@ant-design/pro-chat';
import { MockSSEResponse } from '../mocks/sseResponse';

import { useTheme } from 'antd-style';

const dataArray = [
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "苹"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "果"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "公司"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "是"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "一"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "家"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "科技"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "公司"}, "index": 0, "finish_reason": "complete"}]}`,
];

export default () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        request={async (messages: any) => {
          // 正常业务中如下:
          // const response = await fetch('/api/chat/completion', {
          //   method: 'POST',
          //   headers: {
          //     'Content-Type': 'application/json;charset=UTF-8',
          //   },
          //   body: JSON.stringify({
          //     messages,
          //     stream: true,
          //   }),
          // });
          console.log('messages', messages);

          const mockResponse = new MockSSEResponse(dataArray);
          const response = mockResponse.getResponse();

          // 确保服务器响应是成功的
          if (!response.ok || !response.body) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          // 获取 reader
          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');
          const encoder = new TextEncoder();

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
        }}
      />
    </div>
  );
};
