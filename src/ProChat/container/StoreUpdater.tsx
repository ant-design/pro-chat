import { memo } from 'react';
import { createStoreUpdater } from 'zustand-utils';

import { ChatProps, ChatState, useStoreApi } from '../store';

export type StoreUpdaterProps = Partial<
  Pick<ChatState, 'chats' | 'config' | 'init' | 'onChatsChange' | 'helloMessage'>
> &
  Pick<ChatProps, 'userMeta' | 'assistantMeta'>;

const StoreUpdater = memo<StoreUpdaterProps>(
  ({ init, onChatsChange, userMeta, assistantMeta, helloMessage, chats, config }) => {
    const storeApi = useStoreApi();
    const useStoreUpdater = createStoreUpdater(storeApi);

    useStoreUpdater('init', init);

    useStoreUpdater('userMeta', userMeta);
    useStoreUpdater('assistantMeta', assistantMeta);

    useStoreUpdater('helloMessage', helloMessage);
    useStoreUpdater('config', config);

    useStoreUpdater('chats', chats);
    useStoreUpdater('onChatsChange', onChatsChange);

    return null;
  },
);

export default StoreUpdater;
