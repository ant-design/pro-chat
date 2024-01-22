import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ChatItemProps } from '@/ChatItem';

export interface ActionsProps {
  actions: ChatItemProps['actions'];
  className?: string;
}

const Actions = memo<ActionsProps>(({ actions, className }) => {
  return (
    <Flexbox align={'flex-start'} className={className} role="menubar">
      {actions}
    </Flexbox>
  );
});

export default Actions;
