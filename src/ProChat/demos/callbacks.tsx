import { ProChat, ProChatInstance } from '@ant-design/pro-chat';
import { message } from 'antd';
import React from 'react';

const Callbacks: React.FC = () => {
  const chatRef = React.useRef<ProChatInstance>(null);
  return (
    <ProChat
      chatRef={chatRef}
      initialChats={[
        { id: '1', content: 'test', role: 'user', createAt: Date.now(), updateAt: Date.now() },
      ]}
      chatItemRenderConfig={{
        actionsCallbacks: {
          onEditFinished(id, value) {
            chatRef.current.resendMessage(id);
            message.info('Message updated, new message: ' + value);
          },
          beforeDelFinished(id) {
            const data = chatRef.current.getChatById(id);
            message.error('Delete message: ' + data.content.toString());
          },
          onRegenerateFinished(id, error) {
            const data = chatRef.current.getChatById(id);
            if (!error) {
              message.success('Message regenerated: ' + data.content.toString());
            }
          },
        },
      }}
      request={async (message) => {
        return new Response(message.at(-1).content.toString());
      }}
    />
  );
};

export default Callbacks;
