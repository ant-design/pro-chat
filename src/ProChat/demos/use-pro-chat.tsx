/**
 * compact: true
 */
import { ProChat, ProChatProvider, useProChat } from '@ant-design/pro-chat';
import { Button, Divider, Flex, message } from 'antd';
import { useTheme } from 'antd-style';

import { MockResponse } from '@/ProChat/mocks/streamResponse';
import { example } from '../mocks/basic';

const Chat = () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        request={async (messages) => {
          const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

          const mockResponse = new MockResponse(mockedData, 100);

          return mockResponse.getResponse();
        }}
      />
    </div>
  );
};

const Control = () => {
  const proChat = useProChat();

  return (
    <Flex style={{ padding: 24 }} gap={8} justify={'space-between'}>
      <Flex gap={8}>
        <Button
          type={'primary'}
          onClick={() => {
            proChat.sendMessage('这是程序化发送的消息');
          }}
        >
          发送一条消息
        </Button>
        <Button
          onClick={() => {
            const messages = proChat.getChatMessages();

            const msg = messages.at(-1);
            if (msg) {
              message.info(msg.content);
            } else {
              message.warning('会话为空');
            }
          }}
        >
          获取最新会话消息
        </Button>
      </Flex>

      <Button
        onClick={() => {
          const messages = proChat.getChatMessages();
          const { id, content } = messages[0] || {};

          if (!id) return;
          proChat.setMessageContent(id, content + '👋');
        }}
      >
        修改首条消息，添加表情：👋
      </Button>
      <Flex gap={8}>
        <Button
          danger
          onClick={() => {
            const messages = proChat.getChatMessages();
            proChat.deleteMessage(messages[0].id);
            message.success('已删除第一条消息');
          }}
        >
          删除第一条消息
        </Button>
        <Button
          type={'primary'}
          danger
          onClick={() => {
            proChat.clearMessage();
          }}
        >
          清空消息
        </Button>
      </Flex>
    </Flex>
  );
};

export default () => (
  <ProChatProvider initialChats={Object.values(example.chats)}>
    <Control />
    <Divider>🔼 程序化控制 | 🔽 用户控制</Divider>
    <Chat />
  </ProChatProvider>
);
