/**
 * compact: true
 */
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
import { chatList } from './mocks/threebody';

export default () => {
  const theme = useTheme();

  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        userMeta={{
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          title: 'Ant Design',
        }}
        assistantMeta={{ avatar: '🛸', title: '三体世界', backgroundColor: '#67dedd' }}
        initialChatsList={chatList.chatList}
      />
    </div>
  );
};
