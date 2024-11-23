import { useResponsive } from 'antd-style';
import { memo, useContext, useMemo, type ReactNode } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ChatItemProps } from '@/ChatItem';
import EditableMessage from '@/EditableMessage';
import { Card, ConfigProvider, List } from 'antd';

import { MarkdownProps } from '@ant-design/pro-editor';
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
  markdownProps?: MarkdownProps;
  references?: ChatItemProps['references'];
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
    references,
  }) => {
    const { cx, styles } = useStyles({ editing, placement, primary, type });
    const { mobile } = useResponsive();
    // const references = [
    //   { url: 'https://www.a.com', description: 'lots of meawww', title: 'bb' },
    //   { url: 'https://www.b.com', title: 'bb' },
    //   { url: 'http://woof.com', description: 'ghew ghew', title: 'dog' },
    //   { url: 'https://www.a.com', description: 'lots of meawww', title: 'bb' },
    //   { url: 'https://www.b.com', title: 'bb' },
    //   { url: 'http://woof.com', description: 'ghew ghew', title: 'dog' },
    //   { url: 'https://www.a.com', description: 'lots of meawww', title: 'bb' },
    //   { url: 'https://www.b.com', title: 'bb' },
    //   { url: 'http://woof.com', description: 'ghew ghew', title: 'dog' },
    //   { url: 'https://www.a.com', description: 'lots of meawww', title: 'bb' },
    //   { url: 'https://www.b.com', title: 'bb' },
    //   { url: 'http://woof.com', description: 'ghew ghew', title: 'dog' },
    //   { url: 'https://www.a.com', description: 'lots of meawww', title: 'bb' },
    //   { url: 'https://www.b.com', title: 'bb' },
    //   { url: 'http://woof.com', description: 'ghew ghew', title: 'dog' },
    //   { url: 'https://www.a.com', description: 'lots of meawww', title: 'bb' },
    //   { url: 'https://www.b.com', title: 'bb' },
    //   { url: 'http://woof.com', description: 'ghew ghew', title: 'dog' },
    //   { url: 'https://www.a.com', description: 'lots of meawww', title: 'bb' },
    //   { url: 'https://www.b.com', title: 'bb' },
    //   { url: 'http://woof.com', description: 'ghew ghew', title: 'dog' },
    //   { url: 'https://www.a.com', description: 'lots of meawww', title: 'bb' },
    //   { url: 'https://www.b.com', title: 'bb' },
    //   { url: 'http://woof.com', description: 'ghew ghew', title: 'dog' },
    //   { url: 'https://www.a.com', description: 'lots of meawww', title: 'bb' },
    //   { url: 'https://www.b.com', title: 'bb' },
    //   { url: 'http://woof.com', description: 'ghew ghew', title: 'dog' },
    //   { url: 'https://www.a.com', description: 'lots of meawww', title: 'bb' },
    //   { url: 'https://www.b.com', title: 'bb' },
    //   { url: 'http://woof.com', description: 'ghew ghew', title: 'dog' },
    // ];

    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    const prefixClass = getPrefixCls('pro-chat');

    const renderReferences = () => {
      if (!references || references.length === 0) return null;
      return (
        <>
          <div>
            <strong>References:</strong>
          </div>
          <div className={`${cx(styles.messageReferences, `${prefixClass}-message-references`)}`}>
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={references}
              renderItem={({ title, description, url }) => (
                <List.Item>
                  <Card>
                    {description}
                    <Card.Meta title={title} />
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {new URL(url).hostname}
                    </a>
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </>
      );
    };

    const referencesContent = useMemo(() => renderReferences(), [references]);

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
        markdownProps={markdownProps}
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
        {referencesContent}
      </Flexbox>
    );
  },
);

export default MessageContent;
