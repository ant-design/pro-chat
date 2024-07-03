/**
 * iframe: 1000
 * compact: true
 */
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

import { example } from '../mocks/fullFeature';
import { MockResponse } from '../mocks/streamResponse';

export default () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout, height: '100vh' }}>
      <ProChat
        displayMode={'docs'}
        style={{ height: '100%' }}
        onChatStart={(chat) => {
          console.log('chat start', chat);
        }}
        onChatEnd={(id, type) => {
          console.log('chat end', id);
          console.log('chat end type', type);
        }}
        onChatGenerate={(chunkText) => {
          console.log('chat generate', chunkText);
        }}
        request={async (messages) => {
          const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

          const mockResponse = new MockResponse(mockedData, 100);

          return mockResponse.getResponse();
        }}
        chats={example.chats}
        config={example.config}
      />
    </div>
  );
};
