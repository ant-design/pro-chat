import { formatTime } from '@/utils/formatTime';
import { Flex } from 'antd';
import { ChatItemProps } from './ChatItem/type';

export interface TitleProps {
  avatar: ChatItemProps['avatar'];
  placement?: ChatItemProps['placement'];
  time?: ChatItemProps['time'];
  className?: string;
}

const Title: React.FC<TitleProps> = ({ className, placement, time, avatar }) => {
  return (
    <Flex
      className={className}
      style={{
        flexDirection: placement === 'left' ? 'row' : 'row-reverse',
      }}
      gap={4}
    >
      {avatar?.title}
      {time && <time>{formatTime(time)}</time>}
    </Flex>
  );
};

export default Title;
