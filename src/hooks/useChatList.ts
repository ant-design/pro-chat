import { LOADING_FLAT } from '@/const/message';
import { DEFAULT_AVATAR, DEFAULT_USER_AVATAR } from '@/const/meta';
import { ChatMessage } from '@/types';
import { ModelConfig } from '@/types/config';
import { processSSE } from '@/utils/fetch';
import { genUUID } from '@/utils/uuid';
import { useMergedState } from 'rc-util';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useRefFunction } from './useRefFunction';

export const initialModelConfig: ModelConfig = {
  historyCount: 1,
  model: 'gpt-3.5-turbo',
  params: {
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: 0.6,
    top_p: 1,
  },
  systemRole: '',
};

export interface ProChatMetaData {
  /**
   * 角色头像
   * @description 可选参数，如果不传则使用默认头像
   */
  avatar?: string;
  /**
   *  背景色
   * @description 可选参数，如果不传则使用默认背景色
   */
  backgroundColor?: string;
  /**
   * 名称
   * @description 可选参数，如果不传则使用默认名称
   */
  title?: string;

  /**
   * 附加数据
   * @description 可选参数，如果不传则使用默认名称
   */
  [key: string]: any;
}

export type ProChatUserProfile = {
  user: ProChatMetaData;
  assistant: ProChatMetaData;
};

export const initialState = {
  userProfile: {
    user: {
      avatar: DEFAULT_USER_AVATAR,
    },
    assistant: {
      avatar: DEFAULT_AVATAR,
    },
  },
  config: initialModelConfig,
};

/**
 * Props for the ProChatUIUseListChat component.
 */
type ProChatUIUseListChatProps = {
  initialChatList: ChatMessage<any>[];
  chatList: ChatMessage<any>[];
  loading: boolean;
  helloMessage?: React.ReactNode;
  userProfile: ProChatUserProfile;
  onChatsChange?: (chatList: ChatMessage<any>[]) => void;
  request?: () => Promise<ChatMessage<any>[]>;
  sendMessageRequest?: (message: ChatMessage<any>[]) => Promise<Response | ChatMessage<any>>;
  transformToChatMessage?: (
    preChatMessage: ChatMessage,
    currentContent: { preContent: React.ReactNode; currentContent: string },
  ) => Promise<ChatMessage<any>>;
};

/**
 * Custom hook for managing a chat list.
 * @param props - The hook's configuration options.
 * @returns An object containing the chat list, loading state, and various functions to interact with the chat list.
 */
export const useChatList = (props: ProChatUIUseListChatProps) => {
  let controller = useRef<AbortController | null>(null);

  const chatListRef = useRef<ChatMessage<any>[]>([]);
  /**
   * Custom hook for managing the chat list.
   *
   * @template T - The type of the chat message content.
   * @param {Object} props - The hook props.
   * @param {ChatMessage<T>[]} props.chatList - The initial chat list.
   * @param {ChatMessage<T>[]} props.initialChatList - The default chat list.
   * @param {Function} props.onChatsChange - The callback function to handle chat list changes.
   * @returns {ChatMessage<T>[]} The chat list and the function to update it.
   */
  const [chatList, setChatList] = useMergedState<ChatMessage<any>[]>([], {
    value: props.chatList,
    defaultValue: props.initialChatList,
    onChange: async (value) => {
      if (props?.onChatsChange) {
        await props?.onChatsChange(value);
      }
    },
    postState: (value) => {
      chatListRef.current = value;
      return value;
    },
  });

  const setMessageItem = useRefFunction((id: string, content: ChatMessage<any>) => {
    const newChatList = chatList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...content,
        };
      }
      return item;
    });
    setChatList(newChatList);
  });

  const [loading, setLoading] = useMergedState<boolean>(true, {
    value: props.loading,
  });
  const [isLoadingMessage, setIsLoadingMessage] = useMergedState<boolean>(false);

  /**
   * Fetches the chat list using the provided request function.
   * If the request function is not provided, it sets the loading state to false and returns.
   * Sets the loading state to true before making the request and sets it to false after the request is completed.
   * If an error occurs during the request, logs the error to the console.
   */
  const fetchChatList = useRefFunction(async () => {
    if (!props.request) {
      setLoading(false);
      return;
    }
    controller.current = new AbortController();

    setLoading(true);
    try {
      const response = await props.request();
      setChatList(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  });

  const clearMessage = useRefFunction(() => {
    setChatList([]);
  });

  /**
   * Generates a message record.
   * @param {Partial<ChatMessage<T>>} message - The message to generate.
   */
  const genMessageRecord = useRefFunction(
    (message: Partial<ChatMessage<any>>, type: 'user' | 'assistant' = 'assistant') => {
      return {
        id: genUUID(),
        content: message,
        role: type,
        meta: props.userProfile?.[type] || initialState.userProfile?.[type],
        createAt: Date.now(),
        updateAt: Date.now(),
        ...message,
      } as ChatMessage<any>;
    },
  );

  /**
   * Sends a message and updates the chat list accordingly.
   * @param {string} message - The message to send.
   * @returns {Promise<void>} - A promise that resolves when the message is sent.
   */
  const getLastLoadingMessage = useCallback(() => {
    return chatListRef.current[chatListRef.current.length - 1];
  }, [chatListRef]);

  const sendMessage = useRefFunction(async (message: string | Partial<ChatMessage>) => {
    controller.current = new AbortController();

    const userMessage = genMessageRecord(
      typeof message === 'string' ? { content: message } : { ...message, content: message.content },
      'user',
    );
    chatList.push(userMessage);
    setChatList([...chatList]);

    if (!props?.sendMessageRequest) return;
    setIsLoadingMessage(true);
    const loadingMessage = genMessageRecord({ content: LOADING_FLAT }, 'assistant');
    chatList.push(loadingMessage);
    setChatList([...chatList]);

    try {
      const res = (await Promise.race([
        props.sendMessageRequest?.([chatList[chatList.length - 2]]),
        new Promise((_, reject) => {
          controller.current.signal.addEventListener('abort', () => {
            reject();
          });
        }),
      ])) as Response | ChatMessage<any>;

      if (res instanceof Response) {
        await processSSE(res, {
          signal: controller.current.signal,
          onFinish: async () => {
            const message = getLastLoadingMessage();
            if (!message) return;
            setChatList((prev) => {
              message.isFinished = true;
              return [...prev];
            });
            setIsLoadingMessage(false);
          },
          onMessageHandle: async (text, res, type) => {
            const loadingMessage = getLastLoadingMessage();
            if (!loadingMessage) return;

            if (type === 'done' || controller.current.signal.aborted) {
              loadingMessage.isFinished = true;
              setChatList((prev) => [...prev]);
              setIsLoadingMessage(false);
              return;
            }

            const content =
              loadingMessage.content === LOADING_FLAT ? text : loadingMessage.content + text;
            const updatedMessage = {
              ...loadingMessage,
              updateAt: Date.now(),
              originContent: text,
              isFinished: false,
              content,
            };

            const transformMessage = await props.transformToChatMessage?.(updatedMessage, {
              preContent: loadingMessage.content === LOADING_FLAT ? '' : loadingMessage.content,
              currentContent: text,
            });

            setChatList((prev) => {
              const newList = [...prev];
              newList[newList.length - 1] = transformMessage || updatedMessage;
              return newList;
            });
          },
          onErrorHandle: async (error) => {
            const loadingMessage = getLastLoadingMessage();
            if (loadingMessage) {
              const content = error.message;
              const errorMessage = {
                ...loadingMessage,
                content,
                originContent: content,
                updateAt: Date.now(),
                isFinished: true,
              };

              const transformMessage = await props.transformToChatMessage?.(errorMessage, {
                preContent: loadingMessage.content,
                currentContent: content,
              });

              setChatList((prev) => [...prev, transformMessage || errorMessage]);
            }
            setIsLoadingMessage(false);
          },
        });
      } else {
        const loadingMessage = getLastLoadingMessage();
        if (loadingMessage) {
          const updatedMessage = {
            ...loadingMessage,
            ...res,
            updateAt: Date.now(),
          };

          const transformMessage = await props.transformToChatMessage?.(updatedMessage, {
            preContent: loadingMessage.content,
            currentContent: updatedMessage.originContent,
          });

          setChatList((prev) => [...prev, transformMessage || updatedMessage]);
        }
        setIsLoadingMessage(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  /**
   * Stops the generation of messages.
   */
  const stopGenerateMessage = useRefFunction(() => {
    controller.current.abort?.();
  });

  useEffect(() => {
    fetchChatList();
  }, []);

  const helloMessageList = useMemo(
    () => [
      {
        id: genUUID(),
        content: props.helloMessage,
        role: 'bot',
        createAt: Date.now(),
        updateAt: Date.now(),
        meta: props.userProfile?.assistant || initialState.userProfile.assistant,
      },
    ],
    [],
  );

  return {
    chatList: chatList.length > 0 ? chatList : helloMessageList,
    loading,
    isLoadingMessage,
    stopGenerateMessage,
    setMessageItem,
    clearMessage,
    sendMessage,
    genMessageRecord,
  };
};
