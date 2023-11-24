import { ChatMessage } from '@/types';
import { useMemoizedFn } from 'ahooks';
import { useMemo } from 'react';
import { ChatStore, useStoreApi } from '../store';
import { chatSelectors } from '../store/selectors';

export interface ProChatInstance
  extends Pick<
    ChatStore,
    'resendMessage' | 'stopGenerateMessage' | 'sendMessage' | 'deleteMessage' | 'clearMessage'
  > {
  getChats: () => ChatStore['chats'];
  getChatMessages: () => ChatMessage[];
  setMessageContent: (id: string, content: string) => void;
}

export const useProChat = () => {
  const storeApi = useStoreApi();

  const {
    resendMessage,
    sendMessage,
    stopGenerateMessage,
    deleteMessage,
    clearMessage,
    dispatchMessage,
  } = storeApi.getState();

  const getChats = useMemoizedFn(() => storeApi.getState().chats);
  const getChatMessages = useMemoizedFn(() => chatSelectors.currentChats(storeApi.getState()));

  const setMessageContent = useMemoizedFn((id: string, content: string) => {
    dispatchMessage({ type: 'updateMessage', id, key: 'content', value: content });
  });

  return useMemo<ProChatInstance>(() => {
    return {
      getChats,
      getChatMessages,
      resendMessage,
      sendMessage,
      stopGenerateMessage,
      deleteMessage,
      clearMessage,
      setMessageContent,
    };
  }, []);
};
