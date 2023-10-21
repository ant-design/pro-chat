/**
 * compact: true
 */
import { ProChat } from '@ant-design/pro-chat';

import { useTheme } from 'antd-style';
import { Flexbox } from 'react-layout-kit';

export default () => {
  const theme = useTheme();
  return (
    <Flexbox style={{ background: theme.colorBgLayout }}>
      <ProChat
        helloMessage={
          '这是一条自定义消息，支持 markdown 消息，例如：[ProChat](https://github.com/ant-design/pro-chat)'
        }
      />
    </Flexbox>
  );
};
