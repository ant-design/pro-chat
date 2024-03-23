import { useResponsive } from 'antd-style';
import { memo, useContext, useMemo } from 'react';

import { ConfigProvider, Flex } from 'antd';
import Avatar from './components/Avatar';
import BorderSpacing from './components/BorderSpacing';
import ErrorContent from './components/ErrorContent';
import MessageContent from './components/MessageContent';
import Title from './components/Title';
import { useStyles } from './style';
import type { ChatItemProps } from './type';

const MOBILE_AVATAR_SIZE = 32;

const ChatItem = memo<ChatItemProps>((props) => {
  const {
    avatarAddon,
    onAvatarClick,
    actions,
    className,
    primary,
    loading,
    message,
    placement = 'left',
    type = 'block',
    avatar,
    error,
    showTitle,
    time,
    editing,
    onChange,
    onEditingChange,
    messageExtra,
    renderMessage,
    errorMessage,
    chatItemRenderConfig,
    onDoubleClick,
    originData,
    ...restProps
  } = props;
  const { mobile } = useResponsive();
  const { cx, styles } = useStyles({
    editing,
    placement,
    primary,
    showTitle,
    title: avatar.title,
    type,
  });

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixClass = getPrefixCls('pro-chat');

  const avatarDom = useMemo(() => {
    if (chatItemRenderConfig?.avatarRender === false) return null;
    const dom = (
      <Avatar
        addon={avatarAddon}
        avatar={avatar}
        loading={loading}
        onClick={onAvatarClick}
        placement={placement}
        size={mobile ? MOBILE_AVATAR_SIZE : undefined}
      />
    );
    return chatItemRenderConfig?.avatarRender?.(props, dom) || dom;
  }, [avatar, placement, mobile, loading]);

  const messageContentDom = useMemo(() => {
    if (chatItemRenderConfig?.contentRender === false) return null;
    const dom = error ? (
      <ErrorContent error={error} message={errorMessage} placement={placement} />
    ) : (
      <MessageContent
        editing={editing}
        message={message}
        className={`${prefixClass}-list-item-message-content`}
        messageExtra={messageExtra}
        onChange={onChange}
        onDoubleClick={onDoubleClick}
        onEditingChange={onEditingChange}
        placement={placement}
        primary={primary}
        renderMessage={renderMessage}
        type={type}
      />
    );
    return chatItemRenderConfig?.contentRender?.(props, dom) || dom;
  }, [
    error,
    message,
    messageExtra,
    renderMessage,
    placement,
    primary,
    type,
    editing,
    errorMessage,
    originData,
  ]);

  const titleDom = useMemo(() => {
    if (chatItemRenderConfig?.titleRender === false) return null;
    const dom = (
      <Title
        className={`${cx(styles.name, `${prefixClass}-list-item-title`)}`}
        avatar={avatar}
        placement={placement}
        showTitle={showTitle}
        time={time}
      />
    );
    return chatItemRenderConfig?.titleRender?.(props, dom) || dom;
  }, [time, avatar]);

  if (chatItemRenderConfig?.render === false) return null;

  const itemDom = (
    <Flex
      className={cx(
        styles.container,
        `${prefixClass}-list-item`,
        `${prefixClass}-list-item-${placement}`,
        className,
      )}
      style={{
        flexDirection: placement === 'left' ? 'column' : 'column-reverse',
      }}
      gap={mobile ? 6 : 12}
      {...restProps}
    >
      {avatarDom}
      <Flex
        align={placement === 'left' ? 'flex-start' : 'flex-end'}
        className={cx(styles.messageContainer, `${prefixClass}-list-item-message-container`)}
      >
        {titleDom}
        <Flex
          align={placement === 'left' ? 'flex-start' : 'flex-end'}
          className={cx(styles.messageContent, `${prefixClass}-message-content`)}
          style={{
            flexDirection:
              type === 'block' ? (placement === 'left' ? 'row' : 'row-reverse') : 'column',
          }}
          gap={8}
        >
          {messageContentDom}
        </Flex>
      </Flex>
      {mobile && type === 'block' && <BorderSpacing borderSpacing={MOBILE_AVATAR_SIZE} />}
    </Flex>
  );
  return (
    chatItemRenderConfig?.render?.(
      props,
      {
        avatar: avatarDom,
        messageContent: messageContentDom,
        title: titleDom,
        itemDom,
      },
      itemDom,
    ) || itemDom
  );
});

export default ChatItem;

export type { ChatItemProps } from './type';
