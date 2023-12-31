/**
 * compact: true
 * title: 流式请求
 */
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

import { MockResponse } from '../mocks/streamResponse';

export default () => {
  const theme = useTheme();

  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        request={async (messages) => {
          const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

          const mockResponse = new MockResponse(mockedData, 50);

          return mockResponse.getResponse();
        }}
      />
    </div>
  );
};
