import { memo, useContext, type ReactNode } from 'react';

import { ConfigProvider, Flex } from 'antd';

import { MarkdownProps } from '@ant-design/pro-editor';
import { useStyles } from '../style';
import { ChatItemProps } from '../type';

export interface MessageContentProps {
  children?: ReactNode;
  messageExtra?: ChatItemProps['messageExtra'];
  onChange?: ChatItemProps['onChange'];
  onDoubleClick?: ChatItemProps['onDoubleClick'];
  placement?: ChatItemProps['placement'];
  primary?: ChatItemProps['primary'];
  className?: string;
  markdownProps?: MarkdownProps;
}

const MessageContent = memo<MessageContentProps>(
  ({ className, children, placement, messageExtra, primary, onDoubleClick }) => {
    const { cx, styles } = useStyles({ placement, primary });

    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    const prefixClass = getPrefixCls('pro-chat');

    return (
      <Flex
        className={cx(styles.message, className, styles.editingContainer)}
        onDoubleClick={onDoubleClick}
      >
        {children}
        {messageExtra ? (
          <div className={`${cx(styles.messageExtra, `${prefixClass}-message-extra`)}`}>
            {messageExtra}
          </div>
        ) : null}
      </Flex>
    );
  },
);

export default MessageContent;
