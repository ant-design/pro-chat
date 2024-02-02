/**
 * compact: true
 * iframe: 800
 */
import { PlusOutlined } from '@ant-design/icons';
import { ProChat } from '@ant-design/pro-chat';
import { Button, Form, Input, Space, Upload, message } from 'antd';
import { useTheme } from 'antd-style';
import { ReactNode } from 'react';

export default () => {
  const theme = useTheme();

  const renderInputArea = (
    _: ReactNode,
    onMessageSend: (message: string) => void | Promise<any>,
    onClear: () => void,
  ) => {
    return (
      <Form
        onFinish={async (value) => {
          const { question, files } = value;
          const FilesBase64List = files?.fileList.map(
            (file: any) => `![${file.name}](${file.thumbUrl})`,
          );
          const Prompt = `${question} ${FilesBase64List?.join('\n')}`;
          await onMessageSend(Prompt);
        }}
        initialValues={{ question: '下面的图片是什么意思？' }}
      >
        <Form.Item
          label="Question"
          name="question"
          rules={[{ required: true, message: '请输入你要询问的内容!' }]}
        >
          <Input.TextArea style={{ height: 100 }} />
        </Form.Item>

        <Form.Item
          label="FileUpload"
          name="files"
          rules={[{ required: true, message: '请放入上传图片' }]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={(file) => {
              if (file.type === 'image/png') {
                return true;
              } else {
                message.error('请上传png格式的图片');
                return Upload.LIST_IGNORE;
              }
            }}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          >
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              发送对话消息
            </Button>
            <Button htmlType="button" onClick={onClear}>
              清空当前对话内容
            </Button>
          </Space>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div style={{ background: theme.colorBgLayout, height: '100vh' }}>
      <ProChat renderInputArea={renderInputArea} />
    </div>
  );
};
