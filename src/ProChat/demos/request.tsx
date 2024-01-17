/**
 * compact: true
 * title: 流式请求
 */
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();

  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat />
    </div>
  );
};
