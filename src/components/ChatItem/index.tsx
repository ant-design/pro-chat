import { useResponsive } from 'antd-style';
import { useContext } from 'react';

import { ConfigProvider, Flex } from 'antd';
import cx from 'classnames';
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
    style,
    time,
    messageExtra,
    chatListItemContentStyle,
    chatListItemTitleStyle,
    chatItemRenderConfig,
    chatListItemAvatarStyle,
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
        ...style,
      }}
      gap={mobile ? 6 : 12}
    >
      <ProChatAvatar
        avatar={avatar?.avatar}
        background={avatar?.backgroundColor}
        title={avatar?.title}
        onClick={onAvatarClick}
        loading={loading}
        style={chatListItemAvatarStyle}
      />
      <Flex
        vertical
        align={placement === 'left' ? 'flex-start' : 'flex-end'}
        className={cx(`${prefixClass}-list-item-message-container`)}
      >
        <Title
          style={chatListItemTitleStyle}
          className={`${cx(`${prefixClass}-list-item-title`)}`}
          avatar={avatar}
          placement={placement}
          time={time}
        />
        <Flex
          align={placement === 'left' ? 'flex-start' : 'flex-end'}
          className={cx(`${prefixClass}-message-content`)}
          vertical
          onDoubleClick={onDoubleClick}
          gap={8}
          style={chatListItemContentStyle}
        >
          {children}
          {messageExtra ? (
            <div
              className={`${cx(`${prefixClass}-message-extra ${prefixClass}-message-extra-${placement}`)}`}
            >
              {messageExtra}
            </div>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
  return itemDom;
};
