import { memo } from 'react';

import { Flex } from 'antd';
import { ChatItemProps } from '../type';
import { formatTime } from '../utils/formatTime';

export interface TitleProps {
  avatar: ChatItemProps['avatar'];
  placement?: ChatItemProps['placement'];
  time?: ChatItemProps['time'];
  className?: string;
}

const Title = memo<TitleProps>(({ className, placement, time, avatar }) => {
  return (
    <Flex
      className={className}
      style={{
        flexDirection: placement === 'left' ? 'row' : 'row-reverse',
      }}
      gap={4}
    >
      {avatar.title}
      {time && <time>{formatTime(time)}</time>}
    </Flex>
  );
});

export default Title;
