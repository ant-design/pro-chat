import { memo, useContext, type ReactNode } from 'react';

import { ConfigProvider, Flex } from 'antd';

import { getStatusClassNames } from 'antd/es/_util/statusUtils';
import cx from 'classnames';
import { ChatItemProps } from './ChatItem/type';

export interface MessageContentProps {
  children?: ReactNode;
  messageExtra?: ChatItemProps['messageExtra'];
  onChange?: ChatItemProps['onChange'];
  onDoubleClick?: ChatItemProps['onDoubleClick'];
  placement?: ChatItemProps['placement'];
  className?: string;
}

const MessageContent = memo<MessageContentProps>(
  ({ className, children, placement, messageExtra, onDoubleClick }) => {
    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    const prefixClass = getPrefixCls('pro-chat');

    return (
      <Flex className={cx(className, getStatusClassNames)} onDoubleClick={onDoubleClick}>
        {children}
        {messageExtra ? (
          <div
            className={`${cx(`${prefixClass}-message-extra ${prefixClass}-message-extra-${placement}`)}`}
          >
            {messageExtra}
          </div>
        ) : null}
      </Flex>
    );
  },
);

export default MessageContent;
