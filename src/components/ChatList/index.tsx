import SkeletonList from './SkeletonList';

import { MutableRefObject, useContext } from 'react';

import type { ChatMessage } from '@/types';

import { ConfigProvider } from 'antd';
import { cx } from 'antd-style';
import { ChatItem } from '../ChatItem';
import { ChatItemProps } from '../ChatItem/type';
import { MessageComponent } from './Messages';
import { useStyle } from './style';

export type ChatListProps = {
  chatList: ChatMessage[];
  chatListRef: MutableRefObject<HTMLDivElement>;
  loadingMessage?: ChatMessage<any>;
  loading: boolean;
  className?: string;
  chatItemRenderConfig: ChatItemProps['chatItemRenderConfig'];
  style?: React.CSSProperties;
  chatListItemStyle?: React.CSSProperties;
  chatListItemContentStyle?: React.CSSProperties;
  chatListItemTitleStyle?: React.CSSProperties;
  chatListItemAvatarStyle?: React.CSSProperties;
  chatListItemExtraStyle?: React.CSSProperties;
  chatListItemClassName?: string;
  chatListItemContentClassName?: string;
  chatListItemTitleClassName?: string;
  chatListItemExtraClassName?: string;
  chatListItemAvatarClassName?: string;
};

const ChatList: React.FC<ChatListProps> = (props) => {
  const {
    chatListRef,
    chatItemRenderConfig,
    className,
    loading,
    chatListItemContentStyle,
    chatListItemTitleStyle,
    chatListItemAvatarStyle,
    chatListItemAvatarClassName,
    chatListItemContentClassName,
    chatListItemTitleClassName,
    chatListItemExtraClassName,
    loadingMessage,
    chatList = [],
    style,
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const prefixClass = getPrefixCls('pro-chat-list');
  const { wrapSSR, hashId } = useStyle(prefixClass);

  if (loading)
    return wrapSSR(
      <div className={cx(`${prefixClass}`, className, hashId)} ref={chatListRef}>
        <SkeletonList />
      </div>,
    );

  console.log('chatList', chatList);

  return wrapSSR(
    <div className={cx(`${prefixClass}`, className, hashId)} style={style} ref={chatListRef}>
      {chatList.map((item) => {
        return (
          <ChatItem
            key={item.id}
            data-id={item.id}
            avatar={
              (item as any).meta || {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                title: 'Ant Design',
              }
            }
            style={props.chatListItemStyle}
            originData={item}
            placement={item.role === 'user' ? 'right' : 'left'}
            time={item.updateAt || item.createAt}
            chatListItemContentStyle={chatListItemContentStyle}
            chatListItemTitleStyle={chatListItemTitleStyle}
            chatItemRenderConfig={chatItemRenderConfig}
            chatListItemAvatarStyle={chatListItemAvatarStyle}
            chatListItemAvatarClassName={chatListItemAvatarClassName}
            chatListItemContentClassName={chatListItemContentClassName}
            chatListItemTitleClassName={chatListItemTitleClassName}
            chatListItemExtraClassName={chatListItemExtraClassName}
          >
            <MessageComponent {...item} />
          </ChatItem>
        );
      })}
      {loadingMessage && (
        <ChatItem
          key={loadingMessage.id}
          data-id={loadingMessage.id}
          avatar={
            (loadingMessage as any).meta || {
              avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
              title: 'Ant Design',
            }
          }
          style={props.chatListItemStyle}
          originData={loadingMessage}
          placement={loadingMessage.role === 'user' ? 'right' : 'left'}
          time={loadingMessage.updateAt || loadingMessage.createAt}
          chatListItemContentStyle={chatListItemContentStyle}
          chatListItemTitleStyle={chatListItemTitleStyle}
          chatItemRenderConfig={chatItemRenderConfig}
          chatListItemAvatarStyle={chatListItemAvatarStyle}
          chatListItemAvatarClassName={chatListItemAvatarClassName}
          chatListItemContentClassName={chatListItemContentClassName}
          chatListItemTitleClassName={chatListItemTitleClassName}
          chatListItemExtraClassName={chatListItemExtraClassName}
        >
          <MessageComponent {...loadingMessage} />
        </ChatItem>
      )}
    </div>,
  );
};

export default ChatList;
