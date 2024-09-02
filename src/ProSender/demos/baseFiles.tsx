import { UploadOutlined } from '@ant-design/icons';
import { ProChat, ProSender } from '@ant-design/pro-chat';
import { Button, Upload } from 'antd';
import { useTheme } from 'antd-style';
import { useState } from 'react';

export default () => {
  const theme = useTheme();
  const [files, setFiles] = useState([]);

  const fileUpBtn = (
    <Upload beforeUpload={(files) => setFiles((prevList) => [...prevList, files])}>
      <Button icon={<UploadOutlined />} />
    </Upload>
  );

  return (
    <div style={{ background: theme.colorBgLayout }}>
      <ProChat
        inputAreaRender={() => {
          return (
            <ProSender
              actions={{
                actionsRender: () => <></>,
              }}
              sender={{
                components: {
                  actions: {
                    clear: () => fileUpBtn,
                  },
                },
              }}
              upload={{
                fileList: files,
              }}
            />
          );
        }}
      />
    </div>
  );
};
