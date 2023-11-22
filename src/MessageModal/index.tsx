import { useResponsive } from 'antd-style';
import { CSSProperties, ReactNode, memo } from 'react';
import useControlledState from 'use-merge-value';

import MessageInput, { type MessageInputProps } from '@/MessageInput';
import { Markdown } from '@ant-design/pro-editor';
import { Modal, type ModalProps } from 'antd';

export interface MessageModalProps extends Pick<ModalProps, 'open' | 'footer'> {
  /**
   * @description Whether the message is being edited or not
   * @default false
   */
  editing?: boolean;
  extra?: ReactNode;
  height?: MessageInputProps['height'];
  /**
   * @description Callback fired when message content is changed
   */
  onChange?: (text: string) => void;
  /**
   * @description Callback fired when editing state is changed
   */
  onEditingChange?: (editing: boolean) => void;
  /**
   * @description Callback fired when open state is changed
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * @description Whether the modal is open or not
   * @default false
   */
  placeholder?: string;
  text?: {
    cancel?: string;
    confirm?: string;
    edit?: string;
    title?: string;
  };
  /**
   * @description The value of the message content
   */
  value: string;
}

const MessageModal = memo<MessageModalProps>(
  ({
    editing,
    open,
    height = 'auto',
    onOpenChange,
    onEditingChange,
    placeholder,
    value,
    onChange,
    text,
    footer,
    extra,
  }) => {
    const { mobile } = useResponsive();

    const [isEdit, setTyping] = useControlledState(false, {
      onChange: onEditingChange,
      value: editing,
    });

    const [expand, setExpand] = useControlledState(false, {
      onChange: onOpenChange,
      value: open,
    });

    const isAutoSize = height === 'auto';
    const markdownStyle: CSSProperties = {
      height: isAutoSize ? 'unset' : height,
      overflowX: 'hidden',
      overflowY: 'auto',
    };

    return (
      <Modal
        cancelText={text?.cancel || 'Cancel'}
        footer={isEdit ? null : footer}
        okText={text?.edit || 'Edit'}
        onCancel={() => setExpand(false)}
        onOk={() => setTyping(true)}
        open={expand}
        styles={mobile ? { body: { padding: 16 } } : {}}
        title={text?.title || 'Prompt'}
      >
        {isEdit ? (
          <MessageInput
            defaultValue={value}
            height={height}
            onCancel={() => setTyping(false)}
            onConfirm={(text) => {
              setTyping(false);
              onChange?.(text);
            }}
            placeholder={placeholder}
            text={{
              cancel: text?.cancel,
              confirm: text?.confirm,
            }}
            type={'block'}
          />
        ) : (
          <>
            {extra}
            <Markdown style={value ? markdownStyle : { ...markdownStyle, opacity: 0.5 }}>
              {String(value || placeholder)}
            </Markdown>
          </>
        )}
      </Modal>
    );
  },
);

export default MessageModal;
