/**
 * compact: true
 */
import { chats } from '@/ProChat/mocks/threebody';
import { ProChat } from '@ant-design/pro-chat';
import { message } from 'antd';
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
        chatItemRenderConfig={{
          actionsCallbacks: {
            onEditFinished: (value, chatId) => {
              message.info(`编辑完成，内容为：${value}，消息ID为：${chatId}`);
            },
            onRegenerateFinished: (id, error) => {
              if (error) {
                message.error(`消息ID为：${id}的消息重新生成失败`);
              } else {
                message.success(`消息ID为：${id}的消息重新生成成功`);
              }
            },
          },
        }}
        assistantMeta={{ avatar: '🛸', title: '三体世界', backgroundColor: '#67dedd' }}
        initialChats={Object.values(chats.chats)}
      />
    </div>
  );
};
