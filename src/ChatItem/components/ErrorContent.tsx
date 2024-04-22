import { Alert } from 'antd';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { ChatItemProps } from '@/ChatItem';

import { useStyles } from '../style';

export interface ErrorContentProps {
  message?: string;
  placement?: ChatItemProps['placement'];
}

const ErrorContent = memo<ErrorContentProps>(({ message, placement }) => {
  const { styles } = useStyles({ placement });

  return (
    <Flexbox gap={8}>
      <Alert className={styles.alert} showIcon type={'error'} message={message} />
    </Flexbox>
  );
});

export default ErrorContent;
