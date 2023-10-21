import { createStyles } from 'antd-style';
import antdOverride from './antdOverride';
import global from './global';

export const useOverrideStyles = createStyles(({ token, prefixCls, cx }) => ({
  container: cx(`${prefixCls}-pro-chat`, global(token), antdOverride(token, prefixCls)),
}));
