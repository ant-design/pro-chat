import {
  ChatTokenType,
  GenerateStyle,
  resetComponent,
  useProChatStyleRegister,
} from '@/utils/useStyle';

const genStyle: GenerateStyle<ChatTokenType> = (token) => {
  return {
    [token.componentCls]: {
      minHeight: 44,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      position: 'relative',
      borderTop: `1px solid ${token.colorBorder}`,
      '&-send-area': {
        display: 'flex',
        justifyContent: 'flex-end',
        width: 'max-content',
        padding: '8px',
        position: 'absolute',
        right: 0,
        bottom: 0,
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
