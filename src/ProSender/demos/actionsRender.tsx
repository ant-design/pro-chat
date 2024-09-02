import { CheckCircleOutlined } from '@ant-design/icons';
import { ProChat, ProSender } from '@ant-design/pro-chat';
import { Space, Tag } from 'antd';
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
                actionsInfoRender: (defaultdom, fileList, onRemove) => {
                  if (!fileList || fileList.length === 0) {
                    return;
                  }
                  return (
                    <Space>
                      {fileList.map((item) => {
                        return (
                          <Tag
                            icon={<CheckCircleOutlined />}
                            color="success"
                            key={item.uid}
                            closable
                            onClose={() => {
                              onRemove(item.uid);
                            }}
                          >
                            {item.name}
                          </Tag>
                        );
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
