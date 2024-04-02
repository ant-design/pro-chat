/**
 * compact: true
 */
import { ChatMessage, ProChat } from '@ant-design/pro-chat';

import { Button, Card, Form, Input } from 'antd';
import { useTheme } from 'antd-style';
import { useEffect, useState } from 'react';

import { MockResponse } from './mocks/streamResponse';

const UserForm = (props: { name: string; gender: string }) => {
  return (
    <Card>
      <Form
        initialValues={{
          name: props.name,
          gender: props.gender,
        }}
      >
        <Form.Item label="姓名" name={'name'}>
          <Input />
        </Form.Item>
        <Form.Item label="性别" name={'gender'}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
};

export default () => {
  const theme = useTheme();
  const [chats, setChats] = useState<ChatMessage<Record<string, any>>[]>([]);
  useEffect(() => {
    setChats([
      ...chats,
      {
        content: '帮我记录一个人，名字叫做 Jack，性别男。',
        createAt: 1697862242452,
        id: 'ZGxiX2p4',
        role: 'user',
        updateAt: 1697862243540,
      },
      {
        content: `好的，这是用户记录表：请点击按钮进行提交`,
        createAt: 1697862242458,
        id: 'Sb5pAzLL',
        role: 'assistant',
        updateAt: 1697862243540,
      },
      {
        content: JSON.stringify({ name: 'Jack', gender: '男' }),
        id: 'AK5pGzLL',
        role: 'user-form',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        meta: {
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          title: 'Ant Design',
        },
      },
    ]);
  }, []);

  return (
    <div style={{ background: theme.colorBgLayout, height: '500px' }}>
      <ProChat
        chats={chats}
        onChatsChange={(chats) => {
          setChats(chats);
        }}
        chatItemRenderConfig={{
          contentRender: (item, dom, defaultDom) => {
            if (item?.originData?.role === 'user-form') {
              return <UserForm {...JSON.parse(item?.originData?.content)} />;
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
