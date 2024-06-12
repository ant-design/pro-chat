import ChatList, { ChatListProps } from '@/ChatList';
import isEqual from 'fast-deep-equal';
import { memo, useMemo } from 'react';

import { useStore } from '@/ProChat/store';
import { chatSelectors } from '@/ProChat/store/selectors';

import { ChatListItemProps } from '@/ChatList/ChatListItem';
import useProChatLocale from '@/ProChat/hooks/useProChatLocale';
import { useRefFunction } from '@/ProChat/hooks/useRefFunction';
import { renderActions } from './Actions';
import { renderMessagesExtra } from './Extras';
import { renderMessages } from './Messages';
import SkeletonList from './SkeletonList';

interface ListProps extends Partial<ChatListProps> {
  showTitle?: boolean;
  itemShouldUpdate?: (prevProps: ChatListItemProps, nextProps: ChatListItemProps) => boolean;
}

const List = memo<ListProps>(
  ({ showTitle, itemShouldUpdate, chatItemRenderConfig, renderErrorMessages, markdownProps }) => {
    const data = useStore(chatSelectors.currentChatsWithGuideMessage, isEqual);
    const { localeObject: localeObj } = useProChatLocale();
    const locale = useStore((s) => s.locale);
    const [
      init,
      displayMode,
      enableHistoryCount,
      historyCount,
      chatLoadingId,
      deleteMessage,
      resendMessage,
      dispatchMessage,
    ] = useStore((s) => {
      const config = s.config;

      return [
        s.init,
        s.displayMode,
        config.enableHistoryCount,
        config.historyCount,
        s.chatLoadingId,
        s.deleteMessage,
        s.resendMessage,
        s.dispatchMessage,
      ];
    });

    const onActionsClick = useRefFunction(async (action, { id, error }) => {
      switch (action.key) {
        case 'del': {
          // 执行删除消息回调
          await chatItemRenderConfig?.actionsCallbacks?.onDelete?.(id);
          deleteMessage(id);
          break;
        }
        case 'regenerate': {
          resendMessage(id);

          // if this message is an error message, we need to delete it
          if (error) deleteMessage(id);

          // 执行重新生成
          await chatItemRenderConfig?.actionsCallbacks?.onRegenerate?.(id, error);
          break;
        }
      }

      // TODO: need a custom callback
    });

    const onMessageChange = useRefFunction(async (id, content) => {
      dispatchMessage({ id, key: 'content', type: 'updateMessage', value: content });
      // 执行 Message Update Callback
      await chatItemRenderConfig?.actionsCallbacks?.onEdit?.(id, content);
    });

    const textObj = useMemo(() => {
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
    }, [locale]);
    if (!init) return <SkeletonList />;

    return (
      <ChatList
        showTitle={showTitle}
        data={data}
        itemShouldUpdate={itemShouldUpdate}
        enableHistoryCount={enableHistoryCount}
        historyCount={historyCount}
        loadingId={chatLoadingId}
        onActionsClick={onActionsClick}
        onMessageChange={onMessageChange}
        renderActions={renderActions}
        // need support custom Render
        renderMessages={renderMessages}
        renderErrorMessages={renderErrorMessages}
        renderMessagesExtra={renderMessagesExtra}
        style={{ marginTop: 24 }}
        chatItemRenderConfig={chatItemRenderConfig}
        text={textObj}
        type={displayMode || 'chat'}
        markdownProps={markdownProps}
      />
    );
  },
);

export default List;
