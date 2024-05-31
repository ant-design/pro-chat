import ActionIconGroup from '@/ActionIconGroup';
import { RenderAction } from '@/ChatList';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';
import useCustomChatListAction from '@/hooks/useCustomChatListAction';
import { memo } from 'react';

export const UserActionsBar: RenderAction = memo(({ text, onActionClick, actionsProps }) => {
  const { regenerate, edit, copy, divider, del } = useChatListActionsBar(text);
  const { dropdownMenu, items } = useCustomChatListAction({
    dropdownMenu: [
      edit,
      copy,
      regenerate,
      // divider,
      // TODO: need a translate
      divider,
      del,
    ],
    items: [regenerate, edit],
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
