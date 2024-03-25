import { ChatMessage } from '@/types';
import { useRefFunction } from './useRefFunction';

export interface ProChatInstance {
  /**
   * 获取当前聊天列表对象
   * @returns ChatStore['chatList']
   */
  getChats: () => ['chatList'];
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

export const useProChat = (props) => {
  const {
    resendMessage,
    sendMessage,
    stopGenerateMessage,
    deleteMessage,
    clearMessage,
    dispatchMessage,
    getChatLoadingId,
  } = props;

  const getChats = () => ['chatList'];
  const getChatMessages = () => [];

  const setMessageContent = useRefFunction((id: string, content: string) => {
    dispatchMessage({ type: 'updateMessage', id, key: 'content', value: content });
  });

  const setMessageValue = useRefFunction(
    (id: string, key: keyof ChatMessage<Record<string, any>>, value) => {
      dispatchMessage({ type: 'updateMessage', id, key, value });
    },
  );

  return {
    getChats,
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
};
