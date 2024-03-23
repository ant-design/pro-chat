import SkeletonList from './SkeletonList';

import { useContext } from 'react';

import type { ChatMessage } from '@/types';

import { ConfigProvider } from 'antd';
import { cx } from 'antd-style';
import ChatItem, { ChatListItemProps } from './ChatListItem';

export type ChatListProps = {
  chatList: ChatMessage[];
  loadingId?: string;
  loading: boolean;
  className?: string;
  chatItemRenderConfig: ChatListItemProps['chatItemRenderConfig'];
  style?: React.CSSProperties;
};

const ChatList: React.FC<ChatListProps> = (props) => {
  const { chatItemRenderConfig, className, loading, loadingId, chatList } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const prefixClass = getPrefixCls('pro-chat');

  if (!loading) return <SkeletonList />;
  return (
    <div className={cx(`${prefixClass}-list`, className)} {...props}>
      {chatList.map((item) => {
        return (
          <ChatItem
            loading={loadingId === item.id}
            key={item.id}
            {...item}
            originData={item}
            chatItemRenderConfig={chatItemRenderConfig}
          />
        );
      })}
    </div>
  );
};

export default ChatList;
