import ActionIconGroup from '@/ActionIconGroup';
import { RenderAction } from '@/ChatList';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';
import useCustomChatListAction from '@/hooks/useCustomChatListAction';
import { memo } from 'react';

export const DefaultActionsBar: RenderAction = memo(({ text, onActionClick, actionsProps }) => {
  const { del } = useChatListActionsBar(text);
  const { dropdownMenu, items } = useCustomChatListAction({
    dropdownMenu: [del],
    items: [],
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
