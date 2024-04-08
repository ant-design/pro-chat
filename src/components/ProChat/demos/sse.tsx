/**
 * compact: true
 * title: SSE
 */
import { ProChat } from '@ant-design/pro-chat';

import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        sendMessageRequest={async () => {
          const encoder = new TextEncoder();
          const dataArray = [
            `{"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "苹"}, "index": 0, "finish_reason": null}]}`,
            `{"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "果"}, "index": 0, "finish_reason": null}]}`,
            `{"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "公司"}, "index": 0, "finish_reason": null}]}`,
            `{"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "是"}, "index": 0, "finish_reason": null}]}`,
            `{"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "一"}, "index": 0, "finish_reason": null}]}`,
            `{"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "家"}, "index": 0, "finish_reason": null}]}`,
            `{"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk",task:[{}] ,"created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "科技"}, "index": 0, "finish_reason": null}]}`,
            `{"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "公司"}, "index": 0, "finish_reason": "complete"}]}`,
          ];
          const readableStream = new ReadableStream({
            async start(controller) {
              const push = () => {
                setTimeout(() => {
                  const data = dataArray.shift();
                  if (data) {
                    controller.enqueue(encoder.encode(data));
                    push();
                  } else {
                    controller.close();
                  }
                }, 160);
              };
              push();
            },
          });
          return new Response(readableStream);
        }}
        transformToChatMessage={async (oldChatMessage, current) => {
          if (!current.currentContent) {
            return oldChatMessage;
          }
          return {
            ...oldChatMessage,
            content:
              current.preContent + JSON.parse(current.currentContent).choices[0].delta.content,
          };
        }}
      />
    </div>
  );
};
