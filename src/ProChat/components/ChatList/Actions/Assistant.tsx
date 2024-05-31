import ActionIconGroup from '@/ActionIconGroup';
import { RenderAction } from '@/ChatList';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';
import { memo } from 'react';

import useCustomChatListAction from '@/hooks/useCustomChatListAction';
import { ErrorActionsBar } from '../Actions/Error';

export const AssistantActionsBar: RenderAction = memo(
  ({ text, id, onActionClick, error, actionsProps }) => {
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
      items: [regenerate, copy],
      actionsProps,
    });

    if (id === 'default') return;

    if (error) return <ErrorActionsBar onActionClick={onActionClick} text={text} />;

    return (
      <ActionIconGroup
        dropdownMenu={dropdownMenu}
        items={items}
        onActionClick={onActionClick}
        type="ghost"
      />
    );
  },
);
