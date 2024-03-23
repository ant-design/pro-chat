import { ChatStore } from './store';

export * from './store';

export const { useStore, useStoreApi, Provider } = createContext<StoreApi<ChatStore>>();
