import { ChatList } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { memo } from 'react';

import { useChatStore, useSessionChatInit } from '@/ProChat/store';
import { agentSelectors, chatSelectors } from '@/ProChat/store/selectors';

import { renderActions } from './Actions';
import { renderMessagesExtra } from './Extras';
import { renderMessages } from './Messages';
import SkeletonList from './SkeletonList';

const List = memo(() => {
  const init = useSessionChatInit();

  const data = useChatStore(chatSelectors.currentChatsWithGuideMessage, isEqual);

  const [
    displayMode,
    enableHistoryCount,
    historyCount,
    chatLoadingId,
    deleteMessage,
    resendMessage,
    dispatchMessage,
    translateMessage,
  ] = useChatStore((s) => {
    const config = agentSelectors.currentAgentConfig(s);
    return [
      config.displayMode,
      config.enableHistoryCount,
      config.historyCount,
      s.chatLoadingId,
      s.deleteMessage,
      s.resendMessage,
      s.dispatchMessage,
      s.translateMessage,
    ];
  });

  if (!init) return <SkeletonList />;

  return (
    <ChatList
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

        // click the menu item with translate item, the result is:
        // key: 'en-US'
        // keyPath: ['en-US','translate']
        if (action.keyPath.at(-1) === 'translate') {
          const lang = action.keyPath[0];
          translateMessage(id, lang);
        }
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
