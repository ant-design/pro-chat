/**
 * compact: true
 */
import { ProChat, ProChatInstance } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
import { useEffect, useRef } from 'react';

export default () => {
  const theme = useTheme();

  const chatRef1 = useRef<ProChatInstance>();

  useEffect(() => {
    chatRef1.current.sendMessage('Hello!');
  });

  return (
    <>
      <div style={{ background: theme.colorBgLayout }}>
        <ProChat
          chatRef={chatRef1}
          request={async () => {
            return new Response('token 长度超限', { status: 500, statusText: 'limited of token' });
          }}
        />
      </div>
    </>
  );
};
