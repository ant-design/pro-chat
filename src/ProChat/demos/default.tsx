/**
 * compact: true
 */
import { ProChat } from '@ant-design/pro-chat';

import { useTheme } from 'antd-style';
import { Flexbox } from 'react-layout-kit';
import { example } from '../mocks/basic';

export default () => {
  const theme = useTheme();
  return (
    <Flexbox style={{ background: theme.colorBgLayout }}>
      <ProChat initialChats={example.chats} config={example.config} />
    </Flexbox>
  );
};
