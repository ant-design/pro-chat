import { UploadOutlined } from '@ant-design/icons';
import { Sender } from '@ant-design/x';
import { SenderProps } from '@ant-design/x/es/sender/interface';
import {
  Button,
  ConfigProvider,
  Divider,
  message,
  Space,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { useContext, useEffect, useState } from 'react';
import EnterTypeButton from './components/EnterTypeButton.tsx';
import LocalStorageManager from './storageManager'; // 引入类文件
import { useStyles } from './style';

const ProSender = (
  props: SenderProps & {
    className?: string;
    upload?: UploadProps;
    sender?: SenderProps;
    onSubmit?: (message: string, fileList?: UploadFile[]) => void;
  },
) => {
  const { className, upload, sender, onSubmit } = props || {};

  const { cx, styles } = useStyles();
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixClass = getPrefixCls('pro-chat');

  const localStorageManager = new LocalStorageManager();

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
          beforeUpload={(file) => {
            console.log('file', file, localStorageManager);

            localStorageManager
              .storeFile(file)
              .then((key) => {
                console.log('key', key);

                const storedFiles = localStorageManager.getFiles([key]);
                setFileList((prevList) => [...prevList, ...storedFiles]);
              })
              .catch((error) => {
                message.error(error);
              });

            return false;
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
              const result = localStorageManager.removeFiles([file.uid]);
              if (result[0].success) {
                setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
              } else {
                message.error(result[0].error);
              }
            }}
          />
          <Divider />
        </div>
      );
    }
    return <></>;
  };

  const SenderArea = () => {
    const { onSubmit: defaultSubmit } = sender || {};
    return (
      <Sender
        // @ts-ignore
        className={cx(styles.sender, `${prefixClass}-sender-inner`)}
        enterType={sender?.enterType}
        onSubmit={(message) => {
          onSubmit?.(message, fileList);
          defaultSubmit?.(message);
          setFileList?.([]);
          return true;
        }}
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
