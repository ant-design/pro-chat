import { useEffect } from 'react';

import { ChatStore, useStore } from '../store';

export const useEffectAfterSessionHydrated = (
  fn: (session: typeof useStore, store: ChatStore) => void,
  deps: any[] = [],
) => {
  // const hasTrigger = useRef(false);
  useEffect(() => {
    const hasRehydrated = useStore.persist.hasHydrated();

    if (hasRehydrated) {
      // equal useEffect triggered multi-time
      fn(useStore, useStore.getState());
    } else {
      // keep onFinishHydration just are triggered only once
      // if (hasTrigger.current) return;
      //
      // hasTrigger.current = true;
      // equal useEffect first trigger
      useStore.persist.onFinishHydration(() => {
        fn(useStore, useStore.getState());
      });
    }
  }, deps);
};
