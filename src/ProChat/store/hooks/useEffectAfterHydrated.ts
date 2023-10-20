import { useEffect } from 'react';

import { SessionStore, useChatStore } from '../store';

export const useEffectAfterSessionHydrated = (
  fn: (session: typeof useChatStore, store: SessionStore) => void,
  deps: any[] = [],
) => {
  // const hasTrigger = useRef(false);
  useEffect(() => {
    const hasRehydrated = useChatStore.persist.hasHydrated();

    if (hasRehydrated) {
      // equal useEffect triggered multi-time
      fn(useChatStore, useChatStore.getState());
    } else {
      // keep onFinishHydration just are triggered only once
      // if (hasTrigger.current) return;
      //
      // hasTrigger.current = true;
      // equal useEffect first trigger
      useChatStore.persist.onFinishHydration(() => {
        fn(useChatStore, useChatStore.getState());
      });
    }
  }, deps);
};
