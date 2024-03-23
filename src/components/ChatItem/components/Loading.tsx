import { LoadingOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { useStyles } from '../style';
import { ChatItemProps } from '../type';

export interface LoadingProps {
  loading?: ChatItemProps['loading'];
  placement?: ChatItemProps['placement'];
}

const Loading: React.FC<LoadingProps> = ({ loading, placement }) => {
  const { styles } = useStyles({ placement });

  if (!loading) return null;

  return (
    <Flex align={'center'} className={styles.loading} justify={'center'}>
      <LoadingOutlined style={{ fontSize: 12, strokeWidth: 3 }} />
    </Flex>
  );
};

export default Loading;
