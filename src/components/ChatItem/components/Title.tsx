import { memo } from 'react';

import { Flex } from 'antd';
import { ChatItemProps } from '../type';
import { formatTime } from '../utils/formatTime';

export interface TitleProps {
  avatar: ChatItemProps['avatar'];
  placement?: ChatItemProps['placement'];
  showTitle?: ChatItemProps['showTitle'];
  time?: ChatItemProps['time'];
  className?: string;
}

const Title = memo<TitleProps>(({ showTitle, className, placement, time, avatar }) => {
  return (
    <Flex
      className={className}
      style={{
        flexDirection: placement === 'left' ? 'row' : 'row-reverse',
      }}
      gap={4}
    >
      {showTitle ? avatar.title || 'untitled' : undefined}
      {time && <time>{formatTime(time)}</time>}
    </Flex>
  );
});

export default Title;
