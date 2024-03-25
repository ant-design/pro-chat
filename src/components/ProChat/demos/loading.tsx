/**
 * title: 设置 loading 添加数据获取态
 * compact: true
 */
import { ProChat } from '@ant-design/pro-chat';
import { Button, Divider, Flex } from 'antd';
import { useTheme } from 'antd-style';
import { useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  return (
    <Flex style={{ background: theme.colorBgLayout }}>
      <Flex gap={16} vertical>
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
      </Flex>
      <Divider />
      <ProChat loading={loading} />
    </Flex>
  );
};
