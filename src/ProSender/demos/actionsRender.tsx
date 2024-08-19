import { ProChat, ProSender } from '@ant-design/pro-chat';
import { Card, Empty, Space } from 'antd';
import { useTheme } from 'antd-style';

export default () => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        inputAreaRender={(_, onMessageSend) => {
          return (
            <ProSender
              actions={{
                actionsInfoRender: (defaultdom, fileList) => {
                  if (!fileList || fileList.length === 0) {
                    return <Empty />;
                  }
                  return (
                    <Space>
                      {fileList.map((item) => {
                        console.log('item', item);

                        return <Card key={item.uid} style={{ width: 300 }} title={item.fileName} />;
                      })}
                    </Space>
                  );
                },
              }}
              onSubmit={(message, fileList) => {
                console.log('onSubmit', message, fileList);
                onMessageSend('send');
              }}
            />
          );
        }}
      />
    </div>
  );
};
