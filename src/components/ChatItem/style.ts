import {
  ChatTokenType,
  GenerateStyle,
  resetComponent,
  useProChatStyleRegister,
} from '@/utils/useStyle';

const genStyle: GenerateStyle<ChatTokenType> = (token) => {
  return {
    [token.componentCls]: {
      position: 'relative',
      maxWidth: '100vw',
      padding: '16px',
      contentVisibility: 'auto',
      cursor: 'pointer',
      containIntrinsicSize: '100px',
      '&:hover': {
        [`${token.componentCls}-message-title-time`]: {
          visibility: 'visible',
          opacity: 1,
        },
      },
      '&-message-avatar': {
        width: 40,
        height: 40,
      },
      '&-message-avatar-emoji': {
        fontSize: 24,
        textAlign: 'center',
        lineHeight: '36px',
      },
      '&-message-container': {
        width: '100%',
        display: 'flex',
        '&-right': {
          alignItems: 'flex-end',
        },
        '&-left': {
          alignItems: 'flex-start',
        },
      },
      '&-message-content': {
        width: 'max-content',
        fontSize: token.fontSize,
        padding: token.paddingXS,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadius,

        backgroundColor: token.colorBgContainer,
        p: resetComponent(token),
        pre: resetComponent(token),
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
  return useProChatStyleRegister('ListItem', (token) => {
    const proChatToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genStyle(proChatToken), resetComponent(proChatToken)];
  });
}
