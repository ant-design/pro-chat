/**
 * compact: true
 */
import { example } from '@/ProChat/mocks/customeClassName';
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();

  return (
    <div style={{ background: theme.colorBgLayout }}>
      <style>
        {`
            .my-pro-chat-user {
                background-color: #fff;
            }
            .my-pro-chat-assistant {
                background-color: #000;
            }
        `}
      </style>
      <ProChat
        showTitle
        userMeta={{
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          title: 'Ant Design',
          className: 'my-pro-chat-user',
        }}
        assistantMeta={{
          avatar: '🛸',
          title: '自定义类名',
          className: 'my-pro-chat-assistant',
        }}
        initialChats={Object.values(example.chats)}
      />
    </div>
  );
};
