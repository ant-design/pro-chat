/**
 * compact: true
 */
import { ChatMessage, ProChat } from '@ant-design/pro-chat';

import { useTheme } from 'antd-style';
import { useState } from 'react';

import { example } from '../mocks/basic';
import { MockResponse } from '../mocks/streamResponse';

export default () => {
  const theme = useTheme();

  const [chats, setChats] = useState<ChatMessage<Record<string, any>>[]>(example.chats);

  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        chats={chats}
        onChatsChange={(chats) => {
          setChats(chats);
        }}
        request={async (messages) => {
          const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

          const mockResponse = new MockResponse(mockedData, 100);

          return mockResponse.getResponse();
        }}
      />
    </div>
  );
};
