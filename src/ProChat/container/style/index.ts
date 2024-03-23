import { createStyles } from 'antd-style';
import global from './global';

export const useStyles = createStyles(({ token, prefixCls, cx }) => ({
  container: cx(`${prefixCls}-pro-chat`, global(token)),
}));
