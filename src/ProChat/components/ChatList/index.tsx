import { memo, useMemo } from 'react';

import { useStore } from '@/ProChat/store';
import { chatSelectors } from '@/ProChat/store/selectors';

import { useRefFunction } from '@/ProChat/hooks/useRefFunction';
import { gLocaleObject } from '@/locale';
import SkeletonList from './SkeletonList';

import { useContext } from 'react';

import type { ChatMessage, DivProps } from '@/types';

import { ConfigProvider } from 'antd';
import { cx } from 'antd-style';
import ChatItem, { ListItemProps } from './ChatListItem';

export interface ChatListProps extends DivProps, ListItemProps {
  /**
   * @description Data of chat messages to be displayed
   */
  data: ChatMessage[];
  enableHistoryCount?: boolean;
  historyCount?: number;
  loadingId?: string;
}
export type {
  OnActionClick,
  OnMessageChange,
  RenderAction,
  RenderErrorMessage,
  RenderItem,
  RenderMessage,
  RenderMessageExtra,
} from './ChatListItem';

interface ListProps extends Partial<ChatListProps> {
  showTitle?: boolean;
}

const List = memo<ListProps>((props) => {
  const {
    showTitle,
    chatItemRenderConfig,
    markdownProps,
    renderMessagesExtra,
    className,
    type = 'chat',
    renderMessages,
    renderErrorMessages,
    loadingId,
    renderItems,
    renderActions,
  } = props;
  const data = useStore(chatSelectors.currentChatsWithGuideMessage);
  const locale = useStore((s) => s.locale);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixClass = getPrefixCls('pro-chat');

  const [init, deleteMessage, resendMessage, dispatchMessage] = useStore((s) => {
    return [s.init, s.deleteMessage, s.resendMessage, s.dispatchMessage];
  });

  const onActionsClick = useRefFunction((action, { id, error }) => {
    switch (action.key) {
      case 'del': {
        deleteMessage(id);
        break;
      }
      case 'regenerate': {
        resendMessage(id);

        // if this message is an error message, we need to delete it
        if (error) deleteMessage(id);
        break;
      }
    }
  });

  const onMessageChange = useRefFunction((id, content) =>
    dispatchMessage({ id, key: 'content', type: 'updateMessage', value: content }),
  );

  const text = useMemo(() => {
    const localeObj = gLocaleObject(locale);
    return {
      cancel: localeObj.cancel,
      confirm: localeObj.confirm,
      copy: localeObj.copy,
      copySuccess: localeObj.copySuccess,
      delete: localeObj.delete,
      edit: localeObj.edit,
      history: localeObj.history,
      regenerate: localeObj.regenerate,
    };
  }, []);

  if (!init) return <SkeletonList />;

  return (
    <div className={cx(`${prefixClass}-list`, className)} {...props}>
      {data.map((item) => {
        const itemProps = {
          loading: loadingId === item.id,
          onActionsClick,
          onMessageChange,
          renderActions,
          renderErrorMessages,
          renderItems,
          renderMessages,
          renderMessagesExtra,
          showTitle,
          text,
          type,
        };
        return (
          <ChatItem
            key={item.id}
            {...itemProps}
            {...item}
            originData={item}
            chatItemRenderConfig={chatItemRenderConfig}
            markdownProps={markdownProps}
          />
        );
      })}
    </div>
  );
});

export default List;
