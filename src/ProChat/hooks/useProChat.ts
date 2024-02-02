import { ChatMessage } from '@/types';
import { useMemo } from 'react';
import { ChatStore, useStoreApi } from '../store';
import { chatSelectors } from '../store/selectors';
import { useRefFunction } from './useRefFunction';

export interface ProChatInstance
  extends Pick<
    ChatStore,
    | 'resendMessage'
    | 'stopGenerateMessage'
    | 'sendMessage'
    | 'deleteMessage'
    | 'clearMessage'
    | 'createAIMessage'
  > {
  /**
   * 获取当前聊天列表对象
   * @returns ChatStore['chats']
   */
  getChats: () => ChatStore['chats'];
  /**
   * 获取当前聊天消息列表
   * @returns ChatMessage[]
   */
  getChatMessages: () => ChatMessage[];
  /**
   * 设置消息内容
   * @param id
   * @param content
   * @returns  void
   */
  setMessageContent: (id: string, content: string) => void;
  /**
   * 修改消息的某个属性
   * @param id
   * @param key
   * @param value
   * @returns  void
   */
  setMessageValue: (id: string, key: keyof ChatMessage<Record<string, any>>, value: any) => void;
  /**
   * 滚动到底部
   * @returns
   */
  scrollToBottom?: () => void;
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
    createAIMessage,
  } = storeApi.getState();

  const getChats = useRefFunction(() => storeApi.getState().chats);
  const getChatMessages = useRefFunction(() => chatSelectors.currentChats(storeApi.getState()));

  const setMessageValue = useRefFunction(
    (id: string, key: keyof ChatMessage<Record<string, any>>, value) => {
      dispatchMessage({ type: 'updateMessage', id, key, value });
    },
  );

  const setMessageContent = useRefFunction((id: string, content: string) => {
    dispatchMessage({ type: 'updateMessage', id, key: 'content', value: content });
  });

  return useMemo<ProChatInstance>(() => {
    return {
      getChats,
      getChatMessages,
      resendMessage,
      sendMessage,
      createAIMessage,
      stopGenerateMessage,
      deleteMessage,
      clearMessage,
      setMessageContent,
      setMessageValue,
    };
  }, []);
};
