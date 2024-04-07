/**
 * compact: true
 */
import { ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { ProChat } from '@ant-design/pro-chat';
import { Popover, Tag, Timeline } from 'antd';

import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout, height: '100vh' }}>
      <ProChat
        helloMessage={
          '欢迎使用 ProChat ，我是你的专属机器人，这是我们的 Github：[ProChat](https://github.com/ant-design/pro-chat)'
        }
        sendMessageRequest={async (messages) => {
          const mockedData: string = `这是一段模拟的对话数据。本次会话传入了${messages.length}条消息`;
          return new Response(mockedData);
        }}
        chatItemRenderConfig={{
          contentRender: (_, content) => {
            return (
              <>
                <Popover
                  placement="topLeft"
                  content={
                    <Timeline
                      pending="Recording..."
                      reverse={true}
                      items={[
                        {
                          children: 'Create a services site 2015-09-01',
                        },
                        {
                          children: 'Solve initial network problems 2015-09-01',
                        },
                        {
                          dot: <ClockCircleOutlined className="timeline-clock-icon" />,
                          color: 'red',
                          children: 'Technical testing 2015-09-01',
                        },
                        {
                          children: 'Network problems being solved 2015-09-01',
                        },
                      ]}
                    />
                  }
                >
                  <Tag icon={<SyncOutlined spin />} color="processing">
                    Technical testing 2015-09-01
                  </Tag>
                </Popover>
                <div>{content}</div>
              </>
            );
          },
        }}
        actionsRender={(actions, props) => {
          return [
            <div
              key="custom"
              className={`${props.prefixClass}-item`}
              onClick={() => {
                console.log('custom action');
              }}
              style={{
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: 4,
              }}
            >
              自定义操作
            </div>,
            ...actions,
          ];
        }}
      />
    </div>
  );
};
