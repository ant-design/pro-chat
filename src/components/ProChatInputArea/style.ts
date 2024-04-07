import {
  ChatTokenType,
  GenerateStyle,
  resetComponent,
  useProChatStyleRegister,
} from '@/utils/useStyle';

const genStyle: GenerateStyle<ChatTokenType> = (token) => {
  return {
    [token.componentCls]: {
      minHeight: 120,
      '&-send-area': {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
    [`${token.componentCls}-action-bar`]: {
      position: 'relative',
      display: 'flex',
      padding: `0 ${token.paddingSM}px`,
      [`& > ${token.componentCls}-action-bar-item`]: {
        padding: token.paddingXS,
        borderRadius: token.borderRadius,
        '&:hover': {
          backgroundColor: token.colorBgTextHover,
        },
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
  return useProChatStyleRegister('InputArea', (token) => {
    const proChatToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genStyle(proChatToken), resetComponent(proChatToken)];
  });
}
