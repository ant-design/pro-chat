import { LoadingOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { ChatItemProps } from './ChatItem/type';

export interface LoadingProps {
  loading?: ChatItemProps['loading'];
  placement?: ChatItemProps['placement'];
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <Flex align={'center'} justify={'center'}>
      <LoadingOutlined style={{ fontSize: 12, strokeWidth: 3 }} />
    </Flex>
  );
};

export default Loading;
