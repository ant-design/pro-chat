import { useStore } from '../store';
import { useSessionHydrated } from './useSessionHydrated';

/**
 * 用于判断某个会话是否完全被激活
 */
export const useSessionChatInit = () => {
  const sessionHydrated = useSessionHydrated();
  // TODO: mark when session is active
  const [hasActive] = useStore(() => [true]);

  return sessionHydrated && hasActive;
};
