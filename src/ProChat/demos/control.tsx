/**
 * compact: true
 */
import { ChatMessageMap, ProChat } from '@ant-design/pro-chat';

import { useTheme } from 'antd-style';
import { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import { MockResponse } from '../mocks/streamResponse';

export default () => {
  const theme = useTheme();

  const [chats, setChats] = useState<ChatMessageMap>();

  return (
    <Flexbox style={{ background: theme.colorBgLayout }}>
      <ProChat
        chats={chats}
        onChatsChange={(chats) => {
          console.log(chats);
          setChats(chats);
        }}
        request={async (messages) => {
          const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

          const mockResponse = new MockResponse(mockedData, 100);

          return mockResponse.getResponse();
        }}
      />
    </Flexbox>
  );
};
