import ActionIconGroup from '@/ActionIconGroup';
import { ActionsBarProps } from '@/ChatList/ActionsBar';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';
import useCustomChatListAction from '@/hooks/useCustomChatListAction';
import { memo } from 'react';

export const ErrorActionsBar = memo<ActionsBarProps>(({ text, onActionClick, actionsProps }) => {
  const { regenerate, del } = useChatListActionsBar(text);
  const { items } = useCustomChatListAction({
    dropdownMenu: [],
    items: [regenerate, del],
    actionsProps,
  });

  return <ActionIconGroup items={items} onActionClick={onActionClick} type="ghost" />;
});
