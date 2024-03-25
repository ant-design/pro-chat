/**
 * compact: true
 */
import { ProChat } from '@ant-design/pro-chat';

import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat helloMessage={<div>{'这是一条自定义 ReactNode 消息'}</div>} />
      <ProChat
        helloMessage={
          '这是一条自定义消息，支持 markdown 消息，例如：[ProChat](https://github.com/ant-design/pro-chat)'
        }
      />
    </div>
  );
};
