/**
 * iframe: 500
 */
import { ProChat } from '@ant-design/pro-chat';
import { Flex } from 'antd';
import { MockResponse } from './mocks/streamResponse';

export default () => {
  return (
    <div>
      <Flex align={'center'} style={{ fontSize: 18 }}>
        客服助理
      </Flex>
      <div style={{ flex: '1' }}>
        <ProChat
          sendMessageRequest={async (messages) => {
            const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

            const mockResponse = new MockResponse(mockedData);

            return mockResponse.getResponse();
          }}
        />
      </div>
    </div>
  );
};
