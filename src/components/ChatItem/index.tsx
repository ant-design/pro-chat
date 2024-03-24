import { useResponsive } from 'antd-style';
import { useContext } from 'react';

import { ConfigProvider, Flex } from 'antd';
import cx from 'classnames';
import MessageContent from '../MessageContent';
import ProChatAvatar from '../ProChatAvatar';
import Title from '../Title';
import type { ChatItemProps } from './type';

export const ChatItem: React.FC<ChatItemProps> = (props) => {
  const {
    onAvatarClick,
    className,
    loading,
    children,
    placement = 'left',
    avatar,
    time,
    onChange,
    messageExtra,
    chatItemRenderConfig,
    onDoubleClick,
  } = props;

  const { mobile } = useResponsive();

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixClass = getPrefixCls('pro-chat');

  if (chatItemRenderConfig?.render === false) return null;

  const itemDom = (
    <Flex
      className={cx(`${prefixClass}-list-item`, `${prefixClass}-list-item-${placement}`, className)}
      style={{
        flexDirection: placement === 'left' ? 'row' : 'row-reverse',
      }}
      gap={mobile ? 6 : 12}
    >
      <ProChatAvatar
        avatar={avatar?.avatar}
        background={avatar?.backgroundColor}
        title={avatar?.title}
        onClick={onAvatarClick}
        loading={loading}
      />
      <Flex
        vertical
        align={placement === 'left' ? 'flex-start' : 'flex-end'}
        className={cx(`${prefixClass}-list-item-message-container`)}
      >
        <Title
          className={`${cx(`${prefixClass}-list-item-title`)}`}
          avatar={avatar}
          placement={placement}
          time={time}
        />
        <Flex
          align={placement === 'left' ? 'flex-start' : 'flex-end'}
          className={cx(`${prefixClass}-message-content`)}
          style={{
            flexDirection: placement === 'left' ? 'row' : 'row-reverse',
          }}
          gap={8}
        >
          <MessageContent
            className={`${prefixClass}-list-item-message-content`}
            messageExtra={messageExtra}
            onChange={onChange}
            onDoubleClick={onDoubleClick}
            placement={placement}
          >
            {children}
          </MessageContent>
        </Flex>
      </Flex>
    </Flex>
  );
  return itemDom;
};
