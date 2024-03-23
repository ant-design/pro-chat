/**
 * compact: true
 */
import { chatList } from '@/ProChat/mocks/threebody';
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();

  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        showTitle
        userMeta={{
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
          title: 'Ant Design',
        }}
        assistantMeta={{ avatar: '🛸', title: '三体世界', backgroundColor: '#67dedd' }}
        initialChatsList={Object.values(chatList.chatList)}
      />
    </div>
  );
};
