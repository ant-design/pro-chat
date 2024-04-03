﻿import {
  ChatTokenType,
  GenerateStyle,
  resetComponent,
  useProChatStyleRegister,
} from '@/utils/useStyle';

const genStyle: GenerateStyle<ChatTokenType> = (token) => {
  return {
    [token.componentCls]: {
      overflow: 'auto',
      minHeight: 300,
      [`${token.componentCls}-content-list`]: {
        paddingTop: `${token.padding}px`,
        paddingBottom: `${token.padding}px`,
      },
    },
  };
};

/**
 * ProchatItem
 * @param prefixCls
 * @returns
 */
export function useStyle(prefixCls?: string) {
  return useProChatStyleRegister('ChatList', (token) => {
    const proChatToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genStyle(proChatToken), resetComponent(proChatToken)];
  });
}
