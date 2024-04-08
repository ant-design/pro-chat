/**
 * compact: true
 */
import { ProChat, ProChatInstance } from '@ant-design/pro-chat';
import { MockSSEResponse } from '../mocks/sseResponse';

import { Avatar, Card, Spin } from 'antd';
import { useTheme } from 'antd-style';
import { useRef, useState } from 'react';

const dataArray = [
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "Searching","type":"function"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "苹果"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "公司"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "是"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "一"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "家"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "科技"}, "index": 0, "finish_reason": null}]}`,
  `data: {"id": "chatcmpl-6w****KZb6hx****RzIghUz****Qy", "object": "chat.completion.chunk", "created": 1703582861554, "model": "gpt-3.5-turbo-0301", "choices": [{"delta": {"content": "公司"}, "index": 0, "finish_reason": "complete"}]}`,
];

const LoadingSearch = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <Card>
      <Spin spinning={loading}>{loading ? '正在后台帮你执行操作' : '操作完成！'}</Spin>
    </Card>
  );
};

export default () => {
  const theme = useTheme();
  const chatRef = useRef<ProChatInstance>();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        chatRef={chatRef}
        style={{ height: 800 }}
        transformToChatMessage={async (pre) => {
          try {
            const preJson = JSON.parse(pre);
            const { delta } = preJson;
            const { content, type } = delta;
            if (content === 'Searching' && type === 'function') {
              chatRef.current.pushChat({
                content: 'Doding!',
                id: 'opDqGn0G',
                role: 'function',
              });
            } else {
              return content;
            }
          } catch (error) {}
          return '';
        }}
        chatItemRenderConfig={{
          avatarRender: (item) => {
            if (item?.originData?.role === 'function') {
              return (
                <Avatar
                  size={'large'}
                  src={'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'}
                />
              );
            }
          },

          contentRender: (item) => {
            if (item?.originData?.role === 'function') {
              return <LoadingSearch />;
            }
          },
        }}
        request={async () => {
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
                    controller.enqueue(encoder.encode(JSON.stringify(parsed.choices[0])));
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
