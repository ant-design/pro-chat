import { StoreApi } from 'zustand';
import { createContext } from 'zustand-utils';
import { ChatStore } from './store';

export type { ChatState } from './initialState';
export * from './store';

export const { useStore, useStoreApi, Provider } = createContext<StoreApi<ChatStore>>();
