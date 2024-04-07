import { LoadingOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { ChatItemProps } from './ChatItem/type';

/**
 * Props for the Loading component.
 */
export interface LoadingProps {
  loading?: ChatItemProps['loading'];
  placement?: ChatItemProps['placement'];
}

/**
 * A component that displays a loading indicator.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.loading - Indicates whether the loading indicator should be displayed.
 * @returns {JSX.Element | null} The loading component.
 */
const Loading: React.FC<LoadingProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <Flex align={'center'} justify={'center'}>
      <LoadingOutlined style={{ fontSize: 12, strokeWidth: 3 }} />
    </Flex>
  );
};

export default Loading;
