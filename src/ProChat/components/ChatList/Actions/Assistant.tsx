import ActionIconGroup from '@/ActionIconGroup';
import { RenderAction } from '@/ChatList';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';
import { memo } from 'react';

import { ErrorActionsBar } from './Error';

export const AssistantActionsBar: RenderAction = memo(({ text, id, onActionClick, error }) => {
  const { regenerate, edit, copy, divider, del } = useChatListActionsBar(text);

  if (id === 'default') return;

  if (error) return <ErrorActionsBar onActionClick={onActionClick} text={text} />;

  return (
    <ActionIconGroup
      dropdownMenu={[
        edit,
        copy,
        regenerate,
        // divider,
        // TODO: need a translate
        divider,
        del,
      ]}
      items={[regenerate, copy]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
});
