/**
 * compact: true
 */
import { ChatMessage, ProChat } from '@ant-design/pro-chat';

import { Alert } from 'antd';
import { useTheme } from 'antd-style';
import { useEffect, useState } from 'react';

import { example } from './mocks/fullFeature';
import { MockResponse } from './mocks/streamResponse';

export default () => {
  const theme = useTheme();
  const [chatList, setChatList] = useState<ChatMessage<Record<string, any>>[]>(
    Object.values(example.initialChatsList),
  );
  useEffect(() => {
    setTimeout(() => {
      setChatList([
        ...chatList,
        {
          id: 'VbtDpzsi',
          content: `当前对话剩余的 token 数量为 100`,
          role: 'notification',
        },
      ]);
    }, 3000);
  }, []);

  return (
    <div style={{ background: theme.colorBgLayout, height: '500px' }}>
      <ProChat
        chatList={chatList}
        onChatsChange={(chatList) => {
          setChatList(chatList);
        }}
        chatItemRenderConfig={{
          render: (item, dom, defaultDom) => {
            if (item?.originData?.role === 'notification') {
              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Alert message={item?.originData.content} type="info" showIcon />
                </div>
              );
            }
            return defaultDom;
          },
        }}
        sendMessageRequest={async (messages) => {
          const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

          const mockResponse = new MockResponse(mockedData, 100);

          return mockResponse.getResponse();
        }}
      />
    </div>
  );
};
