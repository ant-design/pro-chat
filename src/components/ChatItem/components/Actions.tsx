import { memo } from 'react';

import { Flex } from 'antd';
import { ChatItemProps } from '../type';

export interface ActionsProps {
  actions: ChatItemProps['actions'];
  className?: string;
}

const Actions = memo<ActionsProps>(({ actions, className }) => {
  return (
    <Flex align={'flex-start'} className={className} role="menubar">
      {actions}
    </Flex>
  );
});

export default Actions;
