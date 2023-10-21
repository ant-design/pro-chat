/**
 * compact: true
 */
import { ChatMessageMap, ProChat } from '@ant-design/pro-chat';

import { useTheme } from 'antd-style';
import { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

export default () => {
  const theme = useTheme();

  const [chats, setChats] = useState<ChatMessageMap>();

  return (
    <Flexbox style={{ background: theme.colorBgLayout }}>
      <ProChat chats={chats} onChatsChange={setChats} />
    </Flexbox>
  );
};
