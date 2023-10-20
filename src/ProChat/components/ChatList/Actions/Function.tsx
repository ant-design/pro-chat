import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';
import { ActionIconGroup, RenderAction } from '@lobehub/ui';
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
