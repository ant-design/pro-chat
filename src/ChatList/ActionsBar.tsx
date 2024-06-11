import { memo } from 'react';

import ActionIconGroup, {
  ActionIconGroupItems,
  type ActionIconGroupProps,
} from '@/ActionIconGroup';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';

/**
 * ActionsBar组件的属性类型定义
 */

export interface ActionsProps {
  actions?: Array<ActionIconGroupItems['key']>;
  moreActions?: Array<ActionIconGroupItems['key']>;
}
export interface ActionsBarProps extends ActionIconGroupProps {
  /**
   * 文本内容
   */
  text?: {
    /**
     * 复制文本
     */
    copy?: string;
    /**
     * 删除文本
     */
    delete?: string;
    /**
     * 编辑文本
     */
    edit?: string;
    /**
     * 重新生成文本
     */
    regenerate?: string;
  };
  /**
   * 内容
   */
  content?: React.ReactNode | undefined;
  /**
   * 操作栏属性
   */
  actionsProps?: ActionsProps;
}

/**
 * ActionsBar 组件
 * 用于渲染操作按钮组。
 */
const ActionsBar = memo<ActionsBarProps>(({ text, ...rest }) => {
  const { regenerate, edit, copy, divider, del } = useChatListActionsBar(text);
  return (
    <ActionIconGroup
      dropdownMenu={[edit, copy, regenerate, divider, del]}
      items={[regenerate, edit]}
      type="ghost"
      {...rest}
    />
  );
});

export default ActionsBar;
