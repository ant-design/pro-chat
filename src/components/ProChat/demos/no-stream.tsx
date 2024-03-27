/**
 * iframe: 500
 * title: 非流式的请求
 * description: 消息将在等待 5s 后返回
 */
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

const delay = (text: string) =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(text);
    }, 5000);
  });

export default () => {
  const theme = useTheme();

  return (
    <div style={{ background: theme.colorBgLayout, height: '100vh' }}>
      <ProChat
        sendMessageRequest={async (messages) => {
          const text = await delay(
            `这是一条模拟非流式输出的消息的消息。本次会话传入了${messages.length}条消息`,
          );

          return new Response(text);
        }}
        style={{ height: '100vh' }}
      />
    </div>
  );
};
