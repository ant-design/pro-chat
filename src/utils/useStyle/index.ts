import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister as useDefaultStyleRegister } from '@ant-design/cssinjs';

import { ConfigProvider as AntdConfigProvider, theme as antdTheme } from 'antd';
import type { GlobalToken } from 'antd/lib/theme/interface';
import type React from 'react';
import { useContext } from 'react';

export type GenerateStyle<
  ComponentToken extends object = GlobalToken,
  ReturnType = CSSInterpolation,
> = (token: ComponentToken, ...rest: any[]) => ReturnType;

export type UseStyleResult = {
  wrapSSR: (node: React.ReactElement) => React.ReactElement;
  hashId: string;
};

export type ChatTokenType = GlobalToken & {
  themeId: number;
  /**
   * prochat 的 className
   * @type {string}
   * @example .ant-pro
   */
  chatCls: string;
  /**
   * antd 的 className
   * @type {string}
   * @example .ant
   */
  antCls: string;
  /**
   * 组件的 className
   */
  componentCls?: string;
};

export const resetComponent: GenerateStyle<ChatTokenType> = (token: ChatTokenType) => ({
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  color: token.colorText,
  fontSize: token.fontSize,
  lineHeight: token.lineHeight,
  listStyle: 'none',
});

export const operationUnit: GenerateStyle<ChatTokenType> = (token: ChatTokenType) => ({
  // FIXME: This use link but is a operation unit. Seems should be a colorPrimary.
  // And Typography use this to generate link style which should not do this.
  color: token.colorLink,
  outline: 'none',
  cursor: 'pointer',
  transition: `color ${token.motionDurationSlow}`,

  '&:focus, &:hover': {
    color: token.colorLinkHover,
  },

  '&:active': {
    color: token.colorLinkActive,
  },
});

/**
 * 封装了一下 antd 的 useStyle，支持了一下antd@4
 * @param componentName {string} 组件的名字
 * @param styleFn {GenerateStyle} 生成样式的函数
 * @returns UseStyleResult
 */
export function useProChatStyleRegister(
  componentName: string,
  styleFn: (token: ChatTokenType) => CSSInterpolation,
) {
  const { token, theme, hashId } = antdTheme.useToken();
  const chatToken = { ...token, chatCls: '', antCls: '' };
  const { getPrefixCls } = useContext(AntdConfigProvider.ConfigContext);

  chatToken.chatCls = `.${getPrefixCls('pro-chat')}`;
  chatToken.antCls = `.${getPrefixCls()}`;

  return {
    wrapSSR: useDefaultStyleRegister(
      {
        theme: theme as any,
        token,
        hashId,
        path: [`ProChat${componentName}`],
      },
      () => styleFn(token as ChatTokenType),
    ),
    hashId,
  };
}
