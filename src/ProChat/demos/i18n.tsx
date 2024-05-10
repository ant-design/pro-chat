import { ProChat, type Locale } from '@ant-design/pro-chat';
import { Segmented } from 'antd';
import { useTheme } from 'antd-style';
import React from 'react';

export default () => {
  const theme = useTheme();
  const [language, setLanguage] = React.useState<Locale>('en-US');
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <Segmented<Locale>
        options={['en-US', 'zh-CN', 'zh-HK']}
        defaultValue="en-US"
        onChange={(v) => {
          setLanguage(v);
        }}
      />
      <ProChat
        locale={language}
        request={async () => {
          return new Response('this is mock data');
        }}
      />
    </div>
  );
};
