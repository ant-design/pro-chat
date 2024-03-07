import { useResponsive } from 'antd-style';
import { memo, useContext, type ReactNode } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ChatItemProps } from '@/ChatItem';
import EditableMessage from '@/EditableMessage';
import { ConfigProvider } from 'antd';

import { useStyles } from '../style';

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
  markdownProps?: ChatItemProps['markdownProps'];
}

const MessageContent = memo<MessageContentProps>(
  ({
    editing,
    onChange,
    onEditingChange,
    className,
    text,
    message,
    placement,
    messageExtra,
    renderMessage,
    markdownProps,
    type,
    primary,
    onDoubleClick,
  }) => {
    const { cx, styles } = useStyles({ editing, placement, primary, type });
    const { mobile } = useResponsive();

    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    const prefixClass = getPrefixCls('pro-chat');

    const content = (
      <EditableMessage
        classNames={{ input: styles.editingInput }}
        editButtonSize={'small'}
        editing={editing}
        fullFeaturedCodeBlock
        onChange={onChange}
        onEditingChange={onEditingChange}
        openModal={mobile ? editing : undefined}
        text={text}
        value={String(message || '...')}
        remarkPlugins={markdownProps?.remarkPlugins}
        rehypePlugins={markdownProps?.rehypePlugins}
      />
    );
    const messageContent = renderMessage ? renderMessage(content) : content;

    return (
      <Flexbox
        className={cx(styles.message, className, editing && styles.editingContainer)}
        onDoubleClick={onDoubleClick}
      >
        {messageContent}
        {messageExtra && !editing ? (
          <div className={`${cx(styles.messageExtra, `${prefixClass}-message-extra`)}`}>
            {messageExtra}
          </div>
        ) : null}
      </Flexbox>
    );
  },
);

export default MessageContent;
