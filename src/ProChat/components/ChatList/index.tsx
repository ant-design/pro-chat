import ChatList from '@/ChatList';
import isEqual from 'fast-deep-equal';
import { memo } from 'react';

import { useStore } from '@/ProChat/store';
import { chatSelectors } from '@/ProChat/store/selectors';

import { renderActions } from './Actions';
import { renderMessagesExtra } from './Extras';
import { renderMessages } from './Messages';
import SkeletonList from './SkeletonList';

interface ListProps {
  showTitle?: boolean;
}
const List = memo<ListProps>(({ showTitle }) => {
  const data = useStore(chatSelectors.currentChatsWithGuideMessage, isEqual);

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

  if (!init) return <SkeletonList />;

  return (
    <ChatList
      showTitle={showTitle}
      // @ts-ignore
      data={data}
      enableHistoryCount={enableHistoryCount}
      historyCount={historyCount}
      loadingId={chatLoadingId}
      onActionsClick={(action, { id, error }) => {
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

        // TODO: need a custom callback
      }}
      onMessageChange={(id, content) =>
        dispatchMessage({ id, key: 'content', type: 'updateMessage', value: content })
      }
      renderActions={renderActions}
      // need support custom Render
      renderMessages={renderMessages}
      renderMessagesExtra={renderMessagesExtra}
      style={{ marginTop: 24 }}
      text={{
        cancel: '取消',
        confirm: '确认',
        copy: '复制',
        copySuccess: '复制成功',
        delete: '删除',
        edit: '编辑',
        history: '历史范围',
        regenerate: '重新生成',
      }}
      type={displayMode || 'chat'}
    />
  );
});

export default List;
