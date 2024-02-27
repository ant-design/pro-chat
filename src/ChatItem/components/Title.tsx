import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ChatItemProps } from '@/ChatItem';
import { formatTime } from '@/ChatItem/utils/formatTime';

export interface TitleProps {
  avatar: ChatItemProps['avatar'];
  placement?: ChatItemProps['placement'];
  showTitle?: ChatItemProps['showTitle'];
  time?: ChatItemProps['time'];
  className?: string;
}

const Title = memo<TitleProps>(({ showTitle, className, placement, time, avatar }) => {
  console.log('time', time);

  return (
    <Flexbox
      className={className}
      direction={placement === 'left' ? 'horizontal' : 'horizontal-reverse'}
      gap={4}
    >
      {showTitle ? avatar.title || 'untitled' : undefined}
      {time && <time>{formatTime(time)}</time>}
    </Flexbox>
  );
});

export default Title;
