import { ChatMessage } from '@/types';
import { useMemo } from 'react';
import { ChatStore, useStoreApi } from '../store';
import { chatSelectors } from '../store/selectors';
import { useRefFunction } from './useRefFunction';

export interface ProChatInstance
  extends Pick<
    ChatStore,
    'resendMessage' | 'stopGenerateMessage' | 'sendMessage' | 'deleteMessage' | 'clearMessage'
  > {
  /**
   * 获取当前聊天列表对象
   * @returns ChatStore['chats']
   */
  getChats: () => ChatStore['chats'];
  /**
   * 按照Id获取聊天列表对象
   * @returns ChatStore['chats']
   */
  getChatById: (id: string) => ChatMessage<Record<string, any>>;
  /**
   * 往数据流中推送消息
   * @returns void
   */
  pushChat: (chats: { id?: string; content: string; role: string; [key: string]: any }) => void;
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
  /**
   * 获取当前 loading 生成的消息 id
   * @returns  消息 id ｜ undefined
   */
  getChatLoadingId: () => string | undefined;
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
    getChatLoadingId,
  } = storeApi.getState();

  const getChats = useRefFunction(() => storeApi.getState().chats);
  const pushChat = useRefFunction((chat) => {
    return dispatchMessage({
      ...chat,
      type: 'addMessage',
      message: chat?.content,
    });
  });
  const getChatMessages = useRefFunction(() => chatSelectors.currentChats(storeApi.getState()));

  const setMessageContent = useRefFunction((id: string, content: string) => {
    dispatchMessage({ type: 'updateMessage', id, key: 'content', value: content });
  });

  const setMessageValue = useRefFunction(
    (id: string, key: keyof ChatMessage<Record<string, any>>, value) => {
      dispatchMessage({ type: 'updateMessage', id, key, value });
    },
  );

  const getChatById = useRefFunction((id: string) =>
    storeApi.getState().chats.find((chat) => chat.id === id),
  );

  return useMemo<ProChatInstance>(() => {
    return {
      getChatById,
      getChats,
      pushChat,
      getChatMessages,
      resendMessage,
      sendMessage,
      getChatLoadingId,
      stopGenerateMessage,
      deleteMessage,
      clearMessage,
      setMessageContent,
      setMessageValue,
    };
  }, []);
};
