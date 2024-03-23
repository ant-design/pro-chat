import { StateCreator } from 'zustand/vanilla';

import { MetaData } from '@/ProChat/types/meta';
import { merge } from 'lodash-es';
import { optionalDevtools } from 'zustand-utils';
import { DevtoolsOptions } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { ChatListProps } from '../components/ChatList';
import { ChatAction, chatAction } from './action';
import { ProChatState, initialState } from './initialState';

export interface ChatProps<T extends Record<string, any> = Record<string, any>>
  extends Partial<ProChatState<T>> {
  // init
  loading?: boolean;
  initialChatsList?: ProChatState<T>['chatList'];
  userMeta?: MetaData;
  assistantMeta?: MetaData;
  /**
   * @description 聊天项的渲染函数
   */
  chatItemRenderConfig?: ChatListProps['chatItemRenderConfig'];
}

//  ===============  聚合 createStoreFn ============ //

export type ChatStore = ChatAction & ProChatState;

const vanillaStore =
  ({
    loading,
    initialChatsList,
    chatList,
    ...props
  }: ChatProps): StateCreator<ChatStore, [['zustand/devtools', never]]> =>
  (...parameters) => {
    // initState = innerState + props

    const finalInitChats = chatList ?? initialChatsList;

    const state = merge({}, initialState, {
      init: !loading,
      chatList: Array.isArray(finalInitChats)
        ? finalInitChats
        : Object.values(finalInitChats || {}),
      ...props,
    } as ProChatState);

    return {
      ...state,
      ...chatAction(...parameters),
    };
  };
//

// ===============  封装 createStore ============ //

const PRO_CHAT = 'PRO_CHAT';

const isDev = process.env.NODE_ENV === 'development';

export const createStore = (props: ChatProps, options: boolean | DevtoolsOptions = false) => {
  const devtools = optionalDevtools(options !== false);

  const devtoolOptions =
    options === false
      ? undefined
      : options === true
        ? { name: PRO_CHAT + (isDev ? '_DEV' : '') }
        : options;

  return createWithEqualityFn<ChatStore>()(devtools(vanillaStore(props), devtoolOptions));
};
