import SkeletonList from './SkeletonList';

import { MutableRefObject, useContext } from 'react';

import type { ChatMessage } from '@/types';

import { DEFAULT_AVATAR, DEFAULT_USER_AVATAR } from '@/const/meta';
import { ProChatMetaData } from '@/hooks/useChatList';
import { ConfigProvider } from 'antd';
import { cx } from 'antd-style';
import { ChatItem } from '../ChatItem';
import { ChatItemProps } from '../ChatItem/type';
import { MessageComponent } from './Messages';
import { useStyle } from './style';

export type ChatListProps = {
  chatList: ChatMessage[];
  chatListRef: MutableRefObject<HTMLDivElement>;
  loading: boolean;
  className?: string;
  chatItemRenderConfig: ChatItemProps['chatItemRenderConfig'];
  style?: React.CSSProperties;
  userMeta?: ProChatMetaData;
  assistantMeta?: ProChatMetaData;
  chatListItemStyle?: React.CSSProperties;
  chatListItemContentStyle?: React.CSSProperties;
  chatListLeftItemContentStyle?: React.CSSProperties;
  chatListRightItemContentStyle?: React.CSSProperties;
  chatListItemTitleStyle?: React.CSSProperties;
  chatListItemAvatarStyle?: React.CSSProperties;
  chatListItemExtraStyle?: React.CSSProperties;
  chatListItemClassName?: string;
  chatListItemContentClassName?: string;
  chatListItemTitleClassName?: string;
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
    chatListLeftItemContentStyle,
    chatListRightItemContentStyle,
    chatListItemAvatarStyle,
    chatListItemAvatarClassName,
    chatListItemContentClassName,
    chatListItemTitleClassName,
    userMeta = {
      avatar: DEFAULT_USER_AVATAR,
    },
    assistantMeta = {
      avatar: DEFAULT_AVATAR,
    },
    chatList = [],
    style,
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const prefixClass = getPrefixCls('pro-chat-list');
  const { wrapSSR, hashId } = useStyle(prefixClass);

  if (loading)
    return wrapSSR(
      <div
        className={cx(`${prefixClass} ${prefixClass}-loading`, className, hashId)}
        ref={chatListRef}
      >
        <SkeletonList />
      </div>,
    );

  return wrapSSR(
    <div className={cx(`${prefixClass}`, className, hashId)} style={style} ref={chatListRef}>
      {chatList.map((item) => {
        return (
          <ChatItem
            key={item.id}
            data-id={item.id}
            avatar={(item as any).meta || (item.role === 'user' ? userMeta : assistantMeta)}
            style={props.chatListItemStyle}
            originData={item}
            placement={item.role === 'user' ? 'right' : 'left'}
            time={item.updateAt || item.createAt}
            chatListItemContentStyle={{
              ...chatListItemContentStyle,
              ...(item.role === 'user'
                ? chatListRightItemContentStyle
                : chatListLeftItemContentStyle),
            }}
            chatListItemTitleStyle={chatListItemTitleStyle}
            chatItemRenderConfig={chatItemRenderConfig}
            chatListItemAvatarStyle={chatListItemAvatarStyle}
            chatListItemAvatarClassName={chatListItemAvatarClassName}
            chatListItemContentClassName={chatListItemContentClassName}
            chatListItemTitleClassName={chatListItemTitleClassName}
          >
            <MessageComponent {...item} />
          </ChatItem>
        );
      })}
    </div>,
  );
};

export default ChatList;
