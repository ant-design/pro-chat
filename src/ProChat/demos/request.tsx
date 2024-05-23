/**
 * compact: true
 */
import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
import { useState } from 'react';

export default () => {
  const theme = useTheme();
  const [value, setValue] = useState();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        locale="en-US"
        inputAreaProps={{
          value: value,
          onChange: (e) => {
            setValue(e);
          },
        }}
      />
    </div>
  );
};
