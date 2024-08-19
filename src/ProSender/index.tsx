import { FileImageOutlined, UploadOutlined } from '@ant-design/icons';
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
import LocalStorageManager from './storageManager.js';
import { useStyles } from './style';

type ActionsType = {
  onFileUpload?: (file: File) => void;
  onRemoveFile?: (file: UploadFile) => void;
  actionsRender?: ([fileUpBtn, imgUpBtn]: Array<React.ReactNode>) => React.ReactNode;
  actionsInfoRender?: (
    defaultdom?: React.ReactNode,
    []?: Array<UploadFile>,
    onRemoveFile?: (uid: string) => Promise<{ key: string; success: boolean; error?: string }>,
  ) => React.ReactNode;
};

const ProSender = (
  props: Omit<SenderProps, 'onSubmit'> & {
    className?: string;
    upload?: UploadProps;
    sender?: SenderProps;
    actions?: ActionsType;
    onSubmit?: (message: string, fileList?: UploadFile[]) => void;
  },
) => {
  const { className, upload, sender, onSubmit, actions } = props || {};

  const { cx, styles } = useStyles();
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixClass = getPrefixCls('pro-chat');

  const localStorageManager = new LocalStorageManager();

  const [fileList, setFileList] = useState<Array<UploadFile>>();

  useEffect(() => {
    setFileList(upload?.fileList || upload?.defaultFileList || []);
  }, []);

  const senderActionsRender = () => {
    const UploadCommanProps = {
      ...upload,
      fileList: [],
      beforeUpload: (file) => {
        localStorageManager
          .storeFile(file)
          .then(async (key) => {
            const storedFiles = await localStorageManager.getFiles([key]);
            setFileList((prevList) => [...prevList, ...storedFiles]);
            actions?.onFileUpload?.(file);
          })
          .catch((error) => {
            message.error(error);
          });
        return false;
      },
    };

    const fileUpBtn = (
      <Upload {...UploadCommanProps}>
        <Button icon={<UploadOutlined />} />
      </Upload>
    );

    const imgUpBtn = (
      <Upload
        {...UploadCommanProps}
        listType="picture"
        beforeUpload={(file) => {
          if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
            message.error('只能上传jpg/png格式的图片');
            return Upload.LIST_IGNORE;
          }
          UploadCommanProps.beforeUpload(file);
        }}
      >
        <Button icon={<FileImageOutlined />} />
      </Upload>
    );

    if (actions?.actionsRender) {
      return actions.actionsRender([fileUpBtn, imgUpBtn]);
    }

    return (
      <Space className={cx(styles.actions, `${prefixClass}-sender-actions`)}>
        {[fileUpBtn, imgUpBtn]}
      </Space>
    );
  };

  const senderFileInfoRender = () => {
    const fileInputRender = () => {
      if (fileList && fileList.length > 0) {
        return (
          <div className={cx(styles.fileInfo, `${prefixClass}-sender-file-info`)}>
            <Upload
              {...upload}
              fileList={fileList}
              listType="picture"
              onRemove={async (file) => {
                const result = await localStorageManager.removeFiles([file.uid]);
                if (result[0].success) {
                  setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
                  actions?.onRemoveFile?.(file);
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

    if (actions?.actionsInfoRender) {
      return actions.actionsInfoRender(fileInputRender(), fileList, async (uid) => {
        setFileList((prevList) => prevList.filter((item) => item.uid !== uid));
        return await localStorageManager.removeFiles([uid]);
      });
    }
    return fileInputRender();
  };

  const senderAreaRender = () => {
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

  return (
    <div className={cx(styles.container, `${prefixClass}-sender`, className)}>
      {senderActionsRender()}
      {senderFileInfoRender()}
      {senderAreaRender()}
    </div>
  );
};

export default ProSender;
