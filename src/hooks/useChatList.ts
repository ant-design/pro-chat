import { useMergedState } from 'rc-util';
import React, { useEffect } from 'react';
import { ChatMessage, MetaData } from '..';
import { useRefFunction } from './useRefFunction';

export const useChatList = (props: {
  initialChatList: ChatMessage<any>[];
  chatList: ChatMessage<any>[];
  loading: boolean;
  helloMessage?: React.ReactNode;
  meta: {
    userMeta?: MetaData;
    assistantMeta?: MetaData;
  };
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
        meta: props.meta?.assistantMeta,
      },
      {
        id: crypto.randomUUID(),
        content: props.helloMessage,
        role: 'user',
        createAt: Date.now(),
        updateAt: Date.now(),
        meta: props.meta?.assistantMeta,
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
