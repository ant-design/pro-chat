import { useContext } from 'react';

import { ConfigProvider, Flex } from 'antd';
import cx from 'classnames';
import { ProChatAvatar } from '../ProChatAvatar';
import { ProChatTitle } from '../ProChatTitle';
import { useStyle } from './style';
import type { ChatItemProps } from './type';

const runRender = (render: any, props: ChatItemProps, defaultDom, ...rest) => {
  if (render) {
    return render(props, defaultDom, ...rest);
  }
  return defaultDom;
};

/**
 * Represents a chat item component.
 *
 * @component
 * @example
 * ```tsx
 * <ChatItem
 *   onAvatarClick={handleAvatarClick}
 *   className="chat-item"
 *   placement="left"
 *   avatar={avatarData}
 *   style={itemStyle}
 *   time={messageTime}
 *   messageExtra={extraContent}
 *   chatListItemContentStyle={contentStyle}
 *   chatListItemTitleStyle={titleStyle}
 *   chatItemRenderConfig={renderConfig}
 *   chatListItemAvatarStyle={avatarStyle}
 *   chatListItemExtraStyle={extraStyle}
 *   onDoubleClick={handleDoubleClick}
 * >
 *   {messageContent}
 * </ChatItem>
 * ```
 *
 * @param {ChatItemProps} props - The props for the ChatItem component.
 * @returns {React.ReactElement} The rendered ChatItem component.
 */
export const ChatItem: React.FC<ChatItemProps> = (props) => {
  const {
    onAvatarClick,
    className,
    children,
    placement = 'left',
    avatar,
    style,
    time,
    contentAfter,
    contentBefore,
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

  const titleDom = runRender(
    chatItemRenderConfig?.titleRender,
    props,
    <ProChatTitle
      style={chatListItemTitleStyle}
      prefixClass={cx(`${prefixClass}-message-title`)}
      title={avatar?.title}
      placement={placement}
      time={time}
    />,
  );

  const avatarDom = runRender(
    chatItemRenderConfig?.avatarRender,
    props,
    <ProChatAvatar
      avatar={avatar?.avatar}
      background={avatar?.backgroundColor}
      title={avatar?.title}
      onClick={onAvatarClick}
      prefixCls={`${prefixClass}-message-avatar`}
      style={chatListItemAvatarStyle}
    />,
  );

  const childrenDom = runRender(chatItemRenderConfig?.contentRender, props, children);

  const contentBeforeRender = runRender(
    chatItemRenderConfig?.contentBeforeRender,
    props,
    contentBefore,
  );

  const contentAfterRender = runRender(
    chatItemRenderConfig?.contentAfterRender,
    props,
    contentAfter,
  );

  const itemDom = wrapSSR(
    <Flex
      className={cx(prefixClass, hashId, `${prefixClass}-${placement}`, className)}
      style={style}
      vertical
      gap={12}
    >
      {titleDom}
      <Flex
        style={{
          flexDirection: placement === 'left' ? 'row' : 'row-reverse',
          ...style,
        }}
        gap={8}
        align={'flex-start'}
        className={cx(`${prefixClass}-message-container`, hashId)}
      >
        {avatarDom}
        <Flex vertical gap={4}>
          {contentBeforeRender ? (
            <div
              className={cx(
                `${prefixClass}-message-before`,
                `${prefixClass}-message-before-${placement}`,
                hashId,
              )}
              style={chatListItemExtraStyle}
            >
              {contentBeforeRender}
            </div>
          ) : null}
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
            {childrenDom}
          </Flex>
          {contentAfterRender ? (
            <div
              className={cx(
                `${prefixClass}-message-after`,
                `${prefixClass}-message-after-${placement}`,
                hashId,
              )}
              style={chatListItemExtraStyle}
            >
              {contentAfterRender}
            </div>
          ) : null}
        </Flex>
      </Flex>
    </Flex>,
  );
  return (
    chatItemRenderConfig?.render?.(
      props,
      {
        avatar: <ProChatAvatar avatar={avatar?.avatar} title={avatar?.title} />,
        title: <ProChatTitle title={avatar?.title} time={time} />,
        messageContent: children,
        itemDom,
      },
      itemDom,
    ) || itemDom
  );
};
