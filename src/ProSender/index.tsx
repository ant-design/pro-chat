import { UploadOutlined } from '@ant-design/icons';
import { Sender } from '@ant-design/x';
import { SenderProps } from '@ant-design/x/es/sender/interface';
import { Button, ConfigProvider, Divider, Space, Upload, UploadFile, UploadProps } from 'antd';
import { useContext, useEffect, useState } from 'react';
import EnterTypeButton from './components/EnterTypeButton.tsx';
import { useStyles } from './style';

const ProSender = (
  props: SenderProps & {
    className?: string;
    upload?: UploadProps;
    sender?: SenderProps;
  },
) => {
  const { className, upload, sender } = props || {};

  const { cx, styles } = useStyles();
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixClass = getPrefixCls('pro-chat');

  const [fileList, setFileList] = useState<Array<UploadFile>>();

  useEffect(() => {
    setFileList(upload?.fileList || upload?.defaultFileList || []);
  }, []);

  const ProSenderActions = () => {
    return (
      <Space className={cx(styles.actions, `${prefixClass}-sender-actions`)}>
        <Upload
          {...upload}
          fileList={[]}
          onChange={(info) => {
            setFileList(info.fileList);
          }}
        >
          <Button icon={<UploadOutlined />} />
        </Upload>
      </Space>
    );
  };

  const SenderFileInfo = () => {
    if (fileList && fileList.length > 0) {
      return (
        <div className={cx(styles.fileInfo, `${prefixClass}-sender-file-info`)}>
          <Upload
            {...upload}
            fileList={fileList}
            listType="picture"
            onRemove={(file) => {
              setFileList(fileList?.filter((item) => item.uid !== file.uid));
            }}
          />
          <Divider />
        </div>
      );
    }
    return <></>;
  };

  const SenderArea = () => {
    return (
      <Sender
        // @ts-ignore
        className={cx(styles.sender, `${prefixClass}-sender-inner`)}
        enterType={sender?.enterType}
        components={{
          actions: {
            wrapper: (props) => <EnterTypeButton enterType={sender?.enterType} {...props} />,
            clear: () => null,
          },
        }}
        {...sender}
      />
    );
  };

  const Wrapper = ({ children }) => {
    return (
      <div className={cx(styles.container, `${prefixClass}-sender`, className)}>{children}</div>
    );
  };

  return (
    <Wrapper>
      <ProSenderActions />
      <SenderFileInfo />
      <SenderArea />
    </Wrapper>
  );
};

export default ProSender;
