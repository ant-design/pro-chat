import { memo, MutableRefObject, useImperativeHandle } from 'react';
import { createStoreUpdater } from 'zustand-utils';

import { ProChatInstance, useProChat } from '../hooks/useProChat';
import { ChatProps, ChatState, useStoreApi } from '../store';

export type ProChatChatReference = MutableRefObject<ProChatInstance | undefined>;

export interface StoreUpdaterProps
  extends Partial<
      Pick<
        ChatState,
        | 'chats'
        | 'config'
        | 'init'
        | 'onChatsChange'
        | 'helloMessage'
        | 'request'
        | 'locale'
        | 'inputAreaProps'
        | 'actions'
        | 'transformToChatMessage'
      >
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
    transformToChatMessage,
    actions,
    inputAreaProps,
    chats,
    config,
    locale,
  }) => {
    const storeApi = useStoreApi();
    const useStoreUpdater = createStoreUpdater(storeApi);

    useStoreUpdater('init', init);

    useStoreUpdater('userMeta', userMeta);
    useStoreUpdater('assistantMeta', assistantMeta);

    useStoreUpdater('inputAreaProps', inputAreaProps);
    useStoreUpdater('helloMessage', helloMessage);
    useStoreUpdater('config', config);

    useStoreUpdater('transformToChatMessage', transformToChatMessage);
    useStoreUpdater('actions', actions);

    useStoreUpdater('chats', chats);
    useStoreUpdater('onChatsChange', onChatsChange);

    useStoreUpdater('request', request);

    useStoreUpdater('locale', locale);
    const instance = useProChat();
    useImperativeHandle(chatRef, () => instance);

    return null;
  },
);

export default StoreUpdater;
