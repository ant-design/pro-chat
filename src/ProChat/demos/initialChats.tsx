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
      <ProChat initialChats={Object.values(example.chats)} />
    </div>
  );
};
