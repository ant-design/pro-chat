'use client';

import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

export default function Home() {
  const theme = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.colorBgLayout,
      }}
    >
      <ProChat
        style={{
          height: '100vh',
          width: '100vw',
        }}
        request={async (messages: Array<any>) => {
          const response = await fetch('/api/openai', {
            method: 'POST',
            body: JSON.stringify({ messages: messages }),
          });

          return response;
        }}
      />
    </div>
  );
}
