/**
 * compact: true
 */
import { ProChat, ProChatInstance } from '@ant-design/pro-chat';
import { Button, Card, Result } from 'antd';
import { useTheme } from 'antd-style';
import { useEffect, useRef } from 'react';

export default () => {
  const theme = useTheme();

  const chatRef1 = useRef<ProChatInstance>();
  const chatRef2 = useRef<ProChatInstance>();

  useEffect(() => {
    chatRef1.current.sendMessage('Hello!');
    chatRef2.current.sendMessage('Hello!');
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
      <div style={{ background: theme.colorBgLayout }}>
        <ProChat
          request={async () => {
            return new Response('token 长度超限', { status: 500, statusText: 'limited of token' });
          }}
          chatRef={chatRef2}
          renderErrorMessages={(errorResponse) => {
            return (
              <Card>
                <Result
                  status="error"
                  title="Something Error"
                  subTitle={errorResponse.message}
                  extra={[
                    <Button type="primary" key="console">
                      Try Again
                    </Button>,
                    <Button key="buy">Buy Token</Button>,
                  ]}
                />
              </Card>
            );
          }}
        />
      </div>
    </>
  );
};
