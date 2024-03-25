/**
 * compact: true
 */
import { ChatMessage, ProChat } from '@ant-design/pro-chat';
import { theme } from 'antd';
import { ThemeProvider } from 'antd-style';
import { useState } from 'react';
import { example } from './mocks/fullFeature';

export default () => {
  const [chatList, setChatList] = useState<ChatMessage<Record<string, any>>[]>(
    example.initialChatsList,
  );

  return (
    <ThemeProvider
      appearance="dark"
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#ED4192',
          colorText: '#1890ff',
          borderRadius: 20,
        },
      }}
    >
      <div style={{ background: '#000' }}>
        <ProChat
          chatList={chatList}
          onChatsChange={(chatList) => {
            setChatList(chatList);
          }}
          request={async (messages) => {
            const mockedData: string = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
            return new Response(mockedData);
          }}
        />
      </div>
    </ThemeProvider>
  );
};
