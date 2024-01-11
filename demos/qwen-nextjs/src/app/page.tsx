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
        request={async (messages) => {
          const response = await fetch('/api/qwen', {
            method: 'POST',
            body: JSON.stringify({ messages: messages }),
          });
          const data = await response.json();
          return new Response(data.output?.text);
        }}
      />
    </div>
  );
}
