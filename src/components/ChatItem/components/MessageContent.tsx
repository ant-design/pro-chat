import { memo, useContext, type ReactNode } from 'react';

import { ConfigProvider, Flex } from 'antd';

import { MarkdownProps } from '@ant-design/pro-editor';
import { useStyles } from '../style';
import { ChatItemProps } from '../type';

export interface MessageContentProps {
  editing?: ChatItemProps['editing'];
  message?: ReactNode;
  messageExtra?: ChatItemProps['messageExtra'];
  onChange?: ChatItemProps['onChange'];
  onDoubleClick?: ChatItemProps['onDoubleClick'];
  onEditingChange?: ChatItemProps['onEditingChange'];
  placement?: ChatItemProps['placement'];
  primary?: ChatItemProps['primary'];
  renderMessage?: ChatItemProps['renderMessage'];
  text?: ChatItemProps['text'];
  type?: ChatItemProps['type'];
  className?: string;
  markdownProps?: MarkdownProps;
}

const MessageContent = memo<MessageContentProps>(
  ({
    editing,
    className,
    message,
    placement,
    messageExtra,
    renderMessage,
    type,
    primary,
    onDoubleClick,
  }) => {
    const { cx, styles } = useStyles({ editing, placement, primary, type });

    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    const prefixClass = getPrefixCls('pro-chat');

    const content = (
      <div>{String(message || '...')}</div>
      // <EditableMessage
      //   classNames={{ input: styles.editingInput }}
      //   editButtonSize={'small'}
      //   editing={editing}
      //   fullFeaturedCodeBlock
      //   onChange={onChange}
      //   onEditingChange={onEditingChange}
      //   openModal={mobile ? editing : undefined}
      //   text={text}
      //   value={String(message || '...')}
      //   markdownProps={markdownProps}
      // />
    );
    const messageContent = renderMessage ? renderMessage(content) : content;

    return (
      <Flex
        className={cx(styles.message, className, editing && styles.editingContainer)}
        onDoubleClick={onDoubleClick}
      >
        {messageContent}
        {messageExtra && !editing ? (
          <div className={`${cx(styles.messageExtra, `${prefixClass}-message-extra`)}`}>
            {messageExtra}
          </div>
        ) : null}
      </Flex>
    );
  },
);

export default MessageContent;
