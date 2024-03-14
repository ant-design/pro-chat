import StoreUpdater, { ProChatChatReference } from '@/ProChat/container/StoreUpdater';
import { memo, ReactNode } from 'react';
import { DevtoolsOptions } from 'zustand/middleware';
import { ChatProps, createStore, Provider, useStoreApi } from '../store';

interface ProChatProviderProps<T extends Record<string, any> = Record<string, any>>
  extends ChatProps<T> {
  children: ReactNode;
  devtoolOptions?: boolean | DevtoolsOptions;
  chatRef?: ProChatChatReference;
}

export const ProChatProvider = memo<ProChatProviderProps<any>>(
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
    ...props
  }) => {
    let isWrapped = true;

    const Content = (
      <>
        {children}
        <StoreUpdater
          chatRef={props.chatRef}
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
      </Provider>
    );
  },
);
