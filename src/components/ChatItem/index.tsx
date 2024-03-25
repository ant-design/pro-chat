import { useResponsive } from 'antd-style';
import { useContext } from 'react';

import { ConfigProvider, Flex } from 'antd';
import cx from 'classnames';
import ProChatAvatar from '../ProChatAvatar';
import Title from '../Title';
import { useStyle } from './style';
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
    chatListItemExtraStyle,
    onDoubleClick,
  } = props;

  const { mobile } = useResponsive();

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const prefixClass = getPrefixCls('pro-chat-list-item');

  const { wrapSSR, hashId } = useStyle(prefixClass);

  if (chatItemRenderConfig?.render === false) return null;

  const itemDom = wrapSSR(
    <Flex
      className={cx(prefixClass, hashId, `${prefixClass}-${placement}`, className)}
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
        className={cx(`${prefixClass}-message-container`, hashId)}
      >
        <Title
          style={chatListItemTitleStyle}
          prefixClass={cx(`${prefixClass}-message-title`)}
          avatar={avatar}
          placement={placement}
          time={time}
        />
        <Flex
          align={placement === 'left' ? 'flex-start' : 'flex-end'}
          className={cx(
            `${prefixClass}-message-content`,
            `${prefixClass}-message-content-${placement}`,
            hashId,
          )}
          vertical
          onDoubleClick={onDoubleClick}
          gap={8}
          style={chatListItemContentStyle}
        >
          {children}
        </Flex>
        {messageExtra ? (
          <div
            className={cx(
              `${prefixClass}-message-extra`,
              `${prefixClass}-message-extra-${placement}`,
              hashId,
            )}
            style={chatListItemExtraStyle}
          >
            {messageExtra}
          </div>
        ) : null}
      </Flex>
    </Flex>,
  );
  return itemDom;
};
