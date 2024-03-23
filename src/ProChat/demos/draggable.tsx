/**
 * iframe: 500
 */
import { MockResponse } from '@/ProChat/mocks/streamResponse';
import { ProChat } from '@ant-design/pro-chat';
import { DraggablePanel } from '@ant-design/pro-editor';
import { Flex } from 'antd';
import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();

  return (
    <DraggablePanel
      mode={'float'}
      defaultPosition={{ x: 400, y: 30 }}
      minHeight={400}
      style={{ background: theme.colorBgLayout, display: 'flex', flexDirection: 'column' }}
    >
      <Flex align={'center'} style={{ fontSize: 18 }}>
        客服助理
      </Flex>
      <div style={{ flex: '1' }}>
        <ProChat
          request={async (messages) => {
            const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

            const mockResponse = new MockResponse(mockedData);

            return mockResponse.getResponse();
          }}
        />
      </div>
    </DraggablePanel>
  );
};
