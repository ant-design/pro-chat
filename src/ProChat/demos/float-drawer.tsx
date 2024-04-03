/**
 * iframe: 500
 */
import { MockResponse } from '@/ProChat/mocks/streamResponse';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ProChat } from '@ant-design/pro-chat';
import { Drawer, FloatButton } from 'antd';
import { useTheme } from 'antd-style';
import { useState } from 'react';

export default () => {
  const theme = useTheme();

  const [open, setOpen] = useState(true);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FloatButton icon={<QuestionCircleOutlined />} type="primary" onClick={showDrawer} />
      <Drawer
        title="客服助理"
        onClose={onClose}
        open={open}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <ProChat
          style={{ background: theme.colorBgLayout }}
          request={async (messages) => {
            const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

            const mockResponse = new MockResponse(mockedData);

            return mockResponse.getResponse();
          }}
        />
      </Drawer>
    </>
  );
};
