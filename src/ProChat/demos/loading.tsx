/**
 * compact: true
 */
import { ProChat } from '@ant-design/pro-chat';
import { Button, Divider } from 'antd';
import { useTheme } from 'antd-style';
import { useState } from 'react';
import { Flexbox } from 'react-layout-kit';

export default () => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  return (
    <Flexbox style={{ background: theme.colorBgLayout }}>
      <Flexbox padding={16} gap={16} horizontal>
        <Button
          type={'primary'}
          onClick={() => {
            setLoading(false);
          }}
        >
          加载完成
        </Button>
        <Button
          onClick={() => {
            setLoading(true);
          }}
        >
          开始加载
        </Button>
      </Flexbox>
      <Divider />
      <ProChat loading={loading} />
    </Flexbox>
  );
};
