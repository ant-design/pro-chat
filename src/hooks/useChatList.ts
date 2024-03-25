import { initialModelConfig } from '@/components/ProChat/ProChat';
import { DEFAULT_AVATAR, DEFAULT_USER_AVATAR } from '@/const/meta';
import { useMergedState } from 'rc-util';
import React, { useEffect } from 'react';
import { ChatMessage } from '..';
import { useRefFunction } from './useRefFunction';

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

export const useChatList = (props: {
  initialChatList: ChatMessage<any>[];
  chatList: ChatMessage<any>[];
  loading: boolean;
  helloMessage?: React.ReactNode;
  userProfile: ProChatUserProfile;
}) => {
  let controller: AbortController | null = null;
  const [chatList, setChatList] = useMergedState<ChatMessage<any>[]>(
    [
      {
        id: crypto.randomUUID(),
        content: props.helloMessage,
        role: 'bot',
        createAt: Date.now(),
        updateAt: Date.now(),
        meta: props.userProfile?.assistant || initialState.userProfile.assistant,
      },
    ],
    {
      value: props.chatList,
      defaultValue: props.initialChatList,
    },
  );

  const [loading, setLoading] = useMergedState<boolean>(true, {
    value: props.loading,
  });

  const fetchChatList = useRefFunction(async () => {
    controller = new AbortController();

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
        signal: controller.signal,
      });
      const data = await response.json();
      setChatList(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  });

  const stopGenerateMessage = useRefFunction(() => {
    if (controller) {
      controller.abort();
    }
  });

  const clearMessage = useRefFunction(() => {
    setChatList([]);
  });

  const sendMessage = useRefFunction((message: string) => {
    setChatList((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content: message,
        role: 'user',
        createAt: Date.now(),
        updateAt: Date.now(),
      },
    ]);
  });

  useEffect(() => {
    fetchChatList();
  }, []);

  return {
    chatList,
    loading,
    stopGenerateMessage,
    clearMessage,
    sendMessage,
  };
};
