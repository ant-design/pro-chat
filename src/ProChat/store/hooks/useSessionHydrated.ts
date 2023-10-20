import { useState } from 'react';

import { useChatStore } from '../store';
import { useEffectAfterSessionHydrated } from './useEffectAfterHydrated';

export const useSessionHydrated = () => {
  // 根据 sessions 是否有值来判断是否已经初始化
  const hasInited = !!Object.values(useChatStore.getState().sessions).length;

  const [isInit, setInit] = useState(hasInited);

  useEffectAfterSessionHydrated(() => {
    if (!isInit) setInit(true);
  }, []);

  return isInit;
};
