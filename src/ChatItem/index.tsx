import { useResponsive } from 'antd-style';
import { memo, useContext, useMemo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ConfigProvider } from 'antd';
import Actions from './components/Actions';
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
    text,
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
        text={text}
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
    text,
    type,
    editing,
    errorMessage,
    originData,
  ]);

  const actionsDom = useMemo(() => {
    if (chatItemRenderConfig?.actionsRender === false) return null;
    const dom = (
      <Actions
        actions={actions}
        className={`${cx(styles.actions, `${prefixClass}-list-item-actions`)}`}
      />
    );
    return chatItemRenderConfig?.actionsRender?.(props, dom) || dom;
  }, [actions]);

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
    <Flexbox
      className={cx(
        styles.container,
        `${prefixClass}-list-item`,
        `${prefixClass}-list-item-${placement}`,
        className,
      )}
      direction={placement === 'left' ? 'horizontal' : 'horizontal-reverse'}
      gap={mobile ? 6 : 12}
      {...restProps}
    >
      {avatarDom}
      <Flexbox
        align={placement === 'left' ? 'flex-start' : 'flex-end'}
        className={cx(styles.messageContainer, `${prefixClass}-list-item-message-container`)}
      >
        {titleDom}
        <Flexbox
          align={placement === 'left' ? 'flex-start' : 'flex-end'}
          className={cx(styles.messageContent, `${prefixClass}-message-content`)}
          direction={
            type === 'block'
              ? placement === 'left'
                ? 'horizontal'
                : 'horizontal-reverse'
              : 'vertical'
          }
          gap={8}
        >
          {messageContentDom}
          {actionsDom}
        </Flexbox>
      </Flexbox>
      {mobile && type === 'block' && <BorderSpacing borderSpacing={MOBILE_AVATAR_SIZE} />}
    </Flexbox>
  );
  return (
    chatItemRenderConfig?.render?.(
      props,
      {
        avatar: avatarDom,
        messageContent: messageContentDom,
        actions: actionsDom,
        title: titleDom,
        itemDom,
      },
      itemDom,
    ) || itemDom
  );
});

export default ChatItem;

export type { ChatItemProps } from './type';
