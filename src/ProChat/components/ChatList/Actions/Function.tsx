import ActionIconGroup from '@/ActionIconGroup';
import { RenderAction } from '@/ChatList';
import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';
import { memo } from 'react';

export const FunctionActionsBar: RenderAction = memo(({ text, onActionClick }) => {
  const { regenerate, divider, del } = useChatListActionsBar(text);
  return (
    <ActionIconGroup
      dropdownMenu={[regenerate, divider, del]}
      items={[regenerate]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
});
