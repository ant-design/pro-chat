import ActionIconGroup from '@/ActionIconGroup';
import { ActionsBarProps } from '@/ChatList/ActionsBar';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';
import { memo } from 'react';

export const ErrorActionsBar = memo<ActionsBarProps>(({ text, onActionClick }) => {
  const { regenerate, del } = useChatListActionsBar(text);

  return <ActionIconGroup items={[regenerate, del]} onActionClick={onActionClick} type="ghost" />;
});
