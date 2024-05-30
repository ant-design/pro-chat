import { createStyles } from 'antd-style';
import global from './global';

export const useOverrideStyles = createStyles(({ token, prefixCls, cx }) => {
  const rootClassName = `${prefixCls}-pro-chat`;

  return {
    container: cx(rootClassName, global(token, rootClassName)),
  };
});
