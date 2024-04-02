/**
 * iframe: 800
 */
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

import { example } from './mocks/fullFeature';
import { MockResponse } from './mocks/streamResponse';

export default () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout, minHeight: '800px' }}>
      <ProChat
        displayMode={'docs'}
        style={{ height: '800px' }}
        sendMessageRequest={async (messages) => {
          const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

          const mockResponse = new MockResponse(mockedData, 100);

          return mockResponse.getResponse();
        }}
        chatList={example.chatList}
        config={example.config}
      />
    </div>
  );
};
