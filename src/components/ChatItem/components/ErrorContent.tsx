import { Alert, Flex } from 'antd';
import { memo } from 'react';

import { useStyles } from '../style';
import { ChatItemProps } from '../type';

export interface ErrorContentProps {
  error?: ChatItemProps['error'];
  message?: ChatItemProps['errorMessage'];
  placement?: ChatItemProps['placement'];
}

const ErrorContent = memo<ErrorContentProps>(({ message, error, placement }) => {
  const { styles } = useStyles({ placement });

  return (
    <Flex gap={8}>
      <Alert className={styles.alert} showIcon type={'error'} {...error} />
      {message}
    </Flex>
  );
});

export default ErrorContent;
