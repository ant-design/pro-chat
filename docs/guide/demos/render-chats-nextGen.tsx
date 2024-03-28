/**
 * compact: true
 */
import { ChatMessage, ProChat } from '@ant-design/pro-chat';

import { Button, Card, ColorPicker, ConfigProvider, Form } from 'antd';
import { useTheme } from 'antd-style';
import { useEffect, useState } from 'react';

import App from './antd-configprovider';
import { MockResponse } from './mocks/streamResponse';

export default () => {
  const theme = useTheme();
  const [chats, setChats] = useState<ChatMessage<Record<string, any>>[]>([]);
  useEffect(() => {
    setChats([
      ...chats,
      {
        content: '我想修改 antd 的主色',
        createAt: 1697862242452,
        id: 'ZGxiX2p4',
        role: 'user',
        updateAt: 1697862243540,
      },
      {
        content: `好的，请选择你要的颜色并确定进行提交`,
        createAt: 1697862242458,
        id: 'Sb5pAzLL',
        role: 'assistant',
        updateAt: 1697862243540,
      },
      {
        content: JSON.stringify({ color: '#1890ff' }),
        id: 'AK5pGzLL',
        role: 'user-form',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        title: 'Ant Design',
      },
    ]);
  }, []);

  const UserForm = (props: { color: string }) => {
    return (
      <Card>
        <Form
          initialValues={{
            color: props.color,
          }}
          onFinish={(value) => {
            setChats([
              ...chats,
              {
                content: `正在帮你渲染内容，请稍等`,
                role: 'assistant',
                id: 'KJ312GF',
              },
            ]);

            setTimeout(() => {
              setChats([
                ...chats,
                {
                  content: `渲染完成，部分组件预览图如下`,
                  role: 'assistant',
                  id: 'KJ312GF',
                },
                {
                  content: JSON.stringify({
                    color: typeof value.color === 'string' ? value.color : value.color.toHex(),
                  }),
                  role: 'preview',
                  id: 'KG312GF',
                  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                  title: 'Ant Design',
                },
              ]);
            }, 2000);
          }}
        >
          <Form.Item label="主颜色选取" name={'color'}>
            <ColorPicker format="hex" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>
    );
  };

  return (
    <div style={{ background: theme.colorBgLayout, height: '1000px' }}>
      <ProChat
        chats={chats}
        onChatsChange={(chats) => {
          setChats(chats);
        }}
        chatItemRenderConfig={{
          contentRender: (item, dom, defaultDom) => {
            if (item?.originData?.role === 'user-form') {
              return <UserForm {...JSON.parse(item?.originData?.content)} />;
            } else if (item?.originData?.role === 'preview') {
              console.log(
                'JSON.parse(item?.originData?.content).color',
                JSON.parse(item?.originData?.content).color,
              );

              return (
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: JSON.parse(item?.originData?.content).color,
                    },
                  }}
                >
                  <App />
                </ConfigProvider>
              );
            }
            return defaultDom;
          },
        }}
        request={async (messages) => {
          const mockedData: string = `这是一段模拟的流式字符串数据。本次会话传入了${messages.length}条消息`;

          const mockResponse = new MockResponse(mockedData, 100);

          return mockResponse.getResponse();
        }}
      />
    </div>
  );
};
