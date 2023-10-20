import { useEffect } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';

import { SessionStore, useChatStore } from '../store';

/**
 * 当 Session 水合完毕后才会执行的 useEffect
 * @param fn
 */
export const useOnFinishHydrationSession = (
  fn: (state: SessionStore, store: UseBoundStore<StoreApi<SessionStore>>) => void,
) => {
  useEffect(() => {
    // 只有当水合完毕后再开始做操作
    useChatStore.persist.onFinishHydration(() => {
      fn(useChatStore.getState(), useChatStore);
    });
  }, []);
};
