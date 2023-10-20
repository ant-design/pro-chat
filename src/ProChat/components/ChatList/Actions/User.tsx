import { useChatListActionsBar } from '@/hooks/useChatListActionsBar';
import { ActionIconGroup, RenderAction } from '@lobehub/ui';
import { memo } from 'react';

export const UserActionsBar: RenderAction = memo(({ text, onActionClick }) => {
  const { regenerate, edit, copy, divider, del } = useChatListActionsBar(text);

  return (
    <ActionIconGroup
      dropdownMenu={[
        edit,
        copy,
        regenerate,
        divider,
        // TODO: need a translate
        divider,
        del,
      ]}
      items={[regenerate, edit]}
      onActionClick={onActionClick}
      type="ghost"
    />
  );
});
