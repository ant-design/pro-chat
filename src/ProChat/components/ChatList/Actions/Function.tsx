import ActionIconGroup from '@/ActionIconGroup';
import { RenderAction } from '@/ChatList';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';
import useCustomChatListAction from '@/hooks/useCustomChatListAction';
import { memo } from 'react';

export const FunctionActionsBar: RenderAction = memo(({ text, onActionClick, actionsProps }) => {
  const { regenerate, divider, del } = useChatListActionsBar(text);
  const { dropdownMenu, items } = useCustomChatListAction({
    dropdownMenu: [regenerate, divider, del],
    items: [regenerate],
    actionsProps,
  });
  return (
    <ActionIconGroup
      dropdownMenu={dropdownMenu}
      items={items}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
});
