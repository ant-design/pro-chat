import { useState } from 'react';

import { useStore } from '../store';
import { useEffectAfterSessionHydrated } from './useEffectAfterHydrated';

export const useSessionHydrated = () => {
  // TODO: 根据 config 是否有值来判断是否已经初始化
  const hasInited = !!Object.values(useStore.getState().config).length;

  const [isInit, setInit] = useState(hasInited);

  useEffectAfterSessionHydrated(() => {
    if (!isInit) setInit(true);
  }, []);

  return isInit;
};
