/**
 * compact: true
 */
import { ProChat } from '@ant-design/pro-chat';

import { useTheme } from 'antd-style';
import { example } from '../mocks/basic';

export default () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        request={'/api/chat'}
        config={example.config}
        autocompleteRequest={async (value) => {
          if (value === '/') {
            return [{ value: '你可以帮助我列出问题吗？', label: '你可以帮助我列出问题吗？' }];
          }
          return [];
        }}
        messageItemExtraRender={(_, type) => {
          if (type === 'user') return <span>🦐</span>;
          return <span>👍</span>;
        }}
        placeholder="输入 / 查看推荐问题，或者直接输入你的问题"
        onResetMessage={async () => {
          console.log('数据清空');
        }}
      />
    </div>
  );
};
