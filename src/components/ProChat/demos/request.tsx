/**
 * compact: true
 * title: 流式请求
 */
import { genUUID } from '@/utils/uuid';
import { ChatMessage, ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();

  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        locale="en-US"
        sendMessageRequest={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                content: 'Hello, I am a robot',
                role: 'assistant',
                createAt: Date.now(),
                updateAt: Date.now(),
                id: genUUID(),
              });
            }, 4000);
          }) as Promise<ChatMessage>;
        }}
      />
    </div>
  );
};
