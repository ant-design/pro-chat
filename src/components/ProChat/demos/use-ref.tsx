/**
 * compact: true
 */
import { ProChat, ProChatInstance } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
import { useRef } from 'react';

import { MockResponse } from '@/ProChat/mocks/streamResponse';
import { Button } from 'antd';
import { example } from '../mocks/basic';

export default () => {
  const theme = useTheme();
  const proChatRef = useRef<ProChatInstance>();

  return (
    <div style={{ background: theme.colorBgLayout }}>
      <Button
        type={'primary'}
        onClick={() => {
          if (!proChatRef.current) return;
          const messages = proChatRef.current.getChatList();
          const { id, content } = messages[0] || {};
          proChatRef.current.scrollToBottom?.();
          if (!id) return;
          proChatRef.current.sendMessage(content + '👋');
        }}
      >
        修改首条消息，添加表情：👋
      </Button>
      <ProChat
        initialChatsList={example.chatList}
        chatRef={proChatRef}
        sendMessageRequest={async (messages) => {
          const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

          const mockResponse = new MockResponse(mockedData, 100);

          return mockResponse.getResponse();
        }}
      />
    </div>
  );
};
