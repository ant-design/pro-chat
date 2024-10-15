/**
 * compact: true
 */
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

import { Button } from 'antd';
import { MockResponse } from '../mocks/streamResponse';

export default () => {
  const theme = useTheme();

  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        chatItemRenderConfig={{
          actionsRender: (props, dom, actionsProps) => {
            if (props?.editing) {
              return null;
            }
            return (
              <Button
                type="default"
                onClick={() => {
                  actionsProps?.onStartEdit();
                }}
              >
                Start Editing
              </Button>
            );
          },
        }}
        request={async (messages) => {
          const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

          const mockResponse = new MockResponse(mockedData);

          return mockResponse.getResponse();
        }}
      />
    </div>
  );
};
