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

  const messageExtraDom = runRender(chatItemRenderConfig?.actionsRender, props, messageExtra);

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
        {messageExtraDom ? (
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
