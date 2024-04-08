/**
 * compact: true
 * iframe: 600
 */
import { ProChat, ProChatInstance } from '@ant-design/pro-chat';
import { Button, Card, Result } from 'antd';
import { useTheme } from 'antd-style';
import { useEffect, useRef } from 'react';
import { MockResponse } from '../mocks/streamResponse';

export default () => {
  const theme = useTheme();

  const chatRef1 = useRef<ProChatInstance>();
  const chatRef2 = useRef<ProChatInstance>();

  useEffect(() => {
    setTimeout(() => {
      chatRef1.current.sendMessage('Hello!');
      chatRef2.current.sendMessage('Hello!');
    }, 500);
  }, []);

  return (
    <>
      <div style={{ background: theme.colorBgLayout }}>
        <ProChat
          chatRef={chatRef1}
          style={{ height: 500 }}
          // @ts-ignore-next-line
          request={async () => {
            const mockResponse = new MockResponse('', 1000, true);
            return mockResponse.getResponse();
          }}
        />
      </div>
      <div style={{ background: theme.colorBgLayout }}>
        <ProChat
          // @ts-ignore-next-line
          request={async () => {
            const mockResponse = new MockResponse('', 1000, true);
            return mockResponse.getResponse();
          }}
          chatRef={chatRef2}
          style={{ height: 500 }}
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
