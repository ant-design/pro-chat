import { useEffect } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';

import { ChatStore, useStore } from '../store';

/**
 * 当 Session 水合完毕后才会执行的 useEffect
 * @param fn
 */
export const useOnFinishHydrationSession = (
  fn: (state: ChatStore, store: UseBoundStore<StoreApi<ChatStore>>) => void,
) => {
  useEffect(() => {
    // 只有当水合完毕后再开始做操作
    useStore.persist.onFinishHydration(() => {
      fn(useStore.getState(), useStore);
    });
  }, []);
};
