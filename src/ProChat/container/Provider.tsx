import StoreUpdater, { ProChatChatReference } from '@/ProChat/container/StoreUpdater';
import { memo, ReactNode } from 'react';
import { DevtoolsOptions } from 'zustand/middleware';
import { ChatProps, createStore, Provider, useStoreApi } from '../store';

interface ProChatProviderProps extends ChatProps {
  children: ReactNode;
  devtoolOptions?: boolean | DevtoolsOptions;
  chatRef?: ProChatChatReference;
}

export const ProChatProvider = memo<ProChatProviderProps>(
  ({
    children,
    devtoolOptions,
    chats,
    onChatsChange,
    loading,
    helloMessage,
    userMeta,
    assistantMeta,
    request,
    chatRef,
    ...props
  }) => {
    let isWrapped = true;

    const Content = (
      <>
        {children}
        <StoreUpdater
          chatRef={chatRef}
          init={!loading}
          helloMessage={helloMessage}
          chats={chats}
          userMeta={userMeta}
          request={request}
          assistantMeta={assistantMeta}
          onChatsChange={onChatsChange}
        />
      </>
    );

    try {
      useStoreApi();
    } catch (e) {
      isWrapped = false;
    }

    if (isWrapped) {
      return Content;
    }

    return (
      <Provider createStore={() => createStore(props, devtoolOptions)}>
        {Content}
        <StoreUpdater
          chatRef={chatRef}
          init={!loading}
          helloMessage={helloMessage}
          chats={chats}
          userMeta={userMeta}
          request={request}
          assistantMeta={assistantMeta}
          onChatsChange={onChatsChange}
        />
      </Provider>
    );
  },
);
