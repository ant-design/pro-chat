import { useContext } from 'react';

import { ConfigProvider, Flex } from 'antd';
import cx from 'classnames';
import { ProChatAvatar } from '../ProChatAvatar';
import { ProChatTitle } from '../ProChatTitle';
import { useStyle } from './style';
import type { ChatItemProps } from './type';

export const ChatItem: React.FC<ChatItemProps> = (props) => {
  const {
    onAvatarClick,
    className,
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

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const prefixClass = getPrefixCls('pro-chat-list-item');

  const { wrapSSR, hashId } = useStyle(prefixClass);

  if (chatItemRenderConfig?.render === false) return null;

  const itemDom = wrapSSR(
    <Flex
      className={cx(prefixClass, hashId, `${prefixClass}-${placement}`, className)}
      style={style}
      vertical
      gap={12}
    >
      <ProChatTitle
        style={chatListItemTitleStyle}
        prefixClass={cx(`${prefixClass}-message-title`)}
        title={avatar?.title}
        placement={placement}
        time={time}
      />
      <Flex
        style={{
          flexDirection: placement === 'left' ? 'row' : 'row-reverse',
          ...style,
        }}
        gap={8}
        align={placement === 'left' ? 'flex-start' : 'flex-end'}
        className={cx(`${prefixClass}-message-container`, hashId)}
      >
        <ProChatAvatar
          avatar={avatar?.avatar}
          background={avatar?.backgroundColor}
          title={avatar?.title}
          onClick={onAvatarClick}
          prefixCls={`${prefixClass}-message-avatar`}
          style={chatListItemAvatarStyle}
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
