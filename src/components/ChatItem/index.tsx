import { useResponsive } from 'antd-style';
import { useContext } from 'react';

import { ConfigProvider, Flex } from 'antd';
import Avatar from './components/Avatar';
import BorderSpacing from './components/BorderSpacing';
import MessageContent from './components/MessageContent';
import Title from './components/Title';
import { useStyles } from './style';
import type { ChatItemProps } from './type';

const MOBILE_AVATAR_SIZE = 32;

const ChatItem: React.FC<ChatItemProps> = (props) => {
  const {
    onAvatarClick,
    className,
    primary,
    loading,
    children,
    placement = 'left',
    avatar,
    time,
    onChange,
    messageExtra,
    chatItemRenderConfig,
    onDoubleClick,
    ...restProps
  } = props;
  const { mobile } = useResponsive();
  const { cx, styles } = useStyles({
    placement,
    primary,
    title: avatar.title,
  });

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixClass = getPrefixCls('pro-chat');

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
      <Avatar
        avatar={avatar}
        loading={loading}
        onClick={onAvatarClick}
        placement={placement}
        size={mobile ? MOBILE_AVATAR_SIZE : undefined}
      />
      <Flex
        align={placement === 'left' ? 'flex-start' : 'flex-end'}
        className={cx(styles.messageContainer, `${prefixClass}-list-item-message-container`)}
      >
        <Title
          className={`${cx(styles.name, `${prefixClass}-list-item-title`)}`}
          avatar={avatar}
          placement={placement}
          time={time}
        />
        <Flex
          align={placement === 'left' ? 'flex-start' : 'flex-end'}
          className={cx(styles.messageContent, `${prefixClass}-message-content`)}
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
            primary={primary}
          >
            {children}
          </MessageContent>
        </Flex>
      </Flex>
      {mobile && <BorderSpacing borderSpacing={MOBILE_AVATAR_SIZE} />}
    </Flex>
  );
  return itemDom;
};

export default ChatItem;

export type { ChatItemProps } from './type';
