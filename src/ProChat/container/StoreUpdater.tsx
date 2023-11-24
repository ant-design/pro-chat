import { memo, MutableRefObject, useImperativeHandle } from 'react';
import { createStoreUpdater } from 'zustand-utils';

import { ProChatInstance, useProChat } from '../hooks/useProChat';
import { ChatProps, ChatState, useStoreApi } from '../store';

export type ProChatChatReference = MutableRefObject<ProChatInstance | undefined>;

export interface StoreUpdaterProps
  extends Partial<
      Pick<ChatState, 'chats' | 'config' | 'init' | 'onChatsChange' | 'helloMessage' | 'request'>
    >,
    Pick<ChatProps, 'userMeta' | 'assistantMeta'> {
  chatRef?: ProChatChatReference;
}

const StoreUpdater = memo<StoreUpdaterProps>(
  ({
    init,
    onChatsChange,
    chatRef,
    request,
    userMeta,
    assistantMeta,
    helloMessage,
    chats,
    config,
  }) => {
    const storeApi = useStoreApi();
    const useStoreUpdater = createStoreUpdater(storeApi);

    useStoreUpdater('init', init);

    useStoreUpdater('userMeta', userMeta);
    useStoreUpdater('assistantMeta', assistantMeta);

    useStoreUpdater('helloMessage', helloMessage);
    useStoreUpdater('config', config);

    useStoreUpdater('chats', chats);
    useStoreUpdater('onChatsChange', onChatsChange);

    useStoreUpdater('request', request);

    const instance = useProChat();
    useImperativeHandle(chatRef, () => instance);

    return null;
  },
);

export default StoreUpdater;
