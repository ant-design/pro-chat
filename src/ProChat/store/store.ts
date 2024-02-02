import { StateCreator } from 'zustand/vanilla';

import { ChatListProps } from '@/ChatList';
import { MetaData } from '@/ProChat/types/meta';
import isEqual from 'fast-deep-equal';
import { merge } from 'lodash-es';
import { optionalDevtools } from 'zustand-utils';
import { DevtoolsOptions } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { ChatAction, chatAction } from './action';
import { ChatPropsState, ChatState, initialState } from './initialState';

export interface ChatProps<T extends Record<string, any> = Record<string, any>>
  extends Partial<ChatPropsState<T>> {
  // init
  loading?: boolean;
  initialChats?: ChatPropsState<T>['chats'];
  userMeta?: MetaData;
  assistantMeta?: MetaData;
  /**
   * @description 聊天项的渲染函数
   */
  chatItemRenderConfig?: ChatListProps['chatItemRenderConfig'];
  /**
   * @description 判断聊天项的更新函数
   */
  itemShouldUpdate?: ChatListProps['itemShouldUpdate'];
}

//  ===============  聚合 createStoreFn ============ //

export type ChatStore = ChatAction & ChatState;

const vanillaStore =
  ({
    loading,
    initialChats,
    chats,
    ...props
  }: ChatProps): StateCreator<ChatStore, [['zustand/devtools', never]]> =>
  (...parameters) => {
    // initState = innerState + props

    const finalInitChats = chats ?? initialChats;

    const state = merge({}, initialState, {
      init: !loading,
      chats: Array.isArray(finalInitChats) ? finalInitChats : Object.values(finalInitChats || {}),
      ...props,
    } as ChatState);

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

  return createWithEqualityFn<ChatStore>()(devtools(vanillaStore(props), devtoolOptions), isEqual);
};
