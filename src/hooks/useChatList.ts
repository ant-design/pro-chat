import { LOADING_FLAT } from '@/const/message';
import { DEFAULT_AVATAR, DEFAULT_USER_AVATAR } from '@/const/meta';
import { ChatMessage } from '@/types';
import { ModelConfig } from '@/types/config';
import { processSSE } from '@/utils/fetch';
import { useMergedState } from 'rc-util';
import React, { useEffect, useMemo, useRef } from 'react';
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

  const [loadingMessage, setLoadingMessage] = useMergedState<ChatMessage<any> | undefined>(
    undefined,
  );

  const getLoadingMessage = useRefFunction(() => {
    return loadingMessage;
  });

  /**
   * Custom hook for managing the chat list.
   *
   * @template T - The type of the chat message content.
   * @param {Object} props - The hook props.
   * @param {ChatMessage<T>[]} props.chatList - The initial chat list.
   * @param {ChatMessage<T>[]} props.initialChatList - The default chat list.
   * @param {UserProfile} props.userProfile - The user profile.
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
   * Sends a message and updates the chat list accordingly.
   * @param {string} message - The message to send.
   * @returns {Promise<void>} - A promise that resolves when the message is sent.
   */
  const sendMessage = useRefFunction(async (message: string) => {
    controller.current = new AbortController();
    setChatList((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content: message,
        role: 'user',
        meta: props.userProfile?.user || initialState.userProfile.user,
        createAt: Date.now(),
        updateAt: Date.now(),
      },
    ]);

    if (!props?.sendMessageRequest) return;

    setLoadingMessage({
      id: crypto.randomUUID(),
      role: 'bot',
      meta: props.userProfile?.assistant || initialState.userProfile.assistant,
      createAt: Date.now(),
      updateAt: Date.now(),
      content: LOADING_FLAT,
    } as ChatMessage<any>);

    const res = (await Promise.race([
      props.sendMessageRequest?.(chatList),
      new Promise((_, reject) => {
        controller.current.signal.addEventListener('abort', () => {
          reject();
        });
      }),
    ])) as Response | ChatMessage<any>;

    if (res instanceof Response) {
      processSSE(res, {
        signal: controller.current.signal,
        onFinish: async () => {
          setLoadingMessage(undefined);
        },
        onMessageHandle: async (text, res, type) => {
          if (type === 'done' || controller.current.signal.aborted) {
            const message = getLoadingMessage();
            if (!message) return;
            setChatList((prev) => {
              return [...prev, message];
            });
            setLoadingMessage(undefined);
            return;
          }
          const content =
            getLoadingMessage()?.content === LOADING_FLAT
              ? ''
              : getLoadingMessage()?.content + text;
          const message = {
            ...getLoadingMessage(),
            updateAt: Date.now(),
            originContent: text,
            content: content,
          };
          const transformMessage = await props.transformToChatMessage?.(message, {
            preContent:
              getLoadingMessage()?.content === LOADING_FLAT ? '' : getLoadingMessage()?.content,
            currentContent: text,
          });

          setLoadingMessage(transformMessage || message);
        },
        onErrorHandle: async (error) => {
          const content = error.message;
          const message = await props.transformToChatMessage?.(
            {
              ...getLoadingMessage(),
              updateAt: Date.now(),
              content: content,
              originContent: content,
            },
            {
              preContent: getLoadingMessage()?.content,
              currentContent: content,
            },
          );
          setLoadingMessage(undefined);
          setChatList((prev) => [...prev, message]);
        },
      });
    } else {
      const message = {
        ...getLoadingMessage(),
        updateAt: Date.now(),
        ...res,
      };

      const transformChatMessage = await props.transformToChatMessage?.(message, {
        preContent: getLoadingMessage()?.content,
        currentContent: message.originContent,
      });

      setLoadingMessage(undefined);
      setChatList((prev) => [...prev, transformChatMessage || message]);
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
        id: crypto.randomUUID(),
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
    loadingMessage,
    stopGenerateMessage,
    setMessageItem,
    clearMessage,
    sendMessage,
  };
};
