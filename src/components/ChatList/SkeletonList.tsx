import { Flex, Skeleton } from 'antd';
import { memo } from 'react';

const SkeletonList = memo(() => {
  return (
    <Flex gap={24} vertical>
      <Skeleton active avatar={{ size: 32 }} paragraph={{ width: ['50%', '30%'] }} title={false} />
      <Skeleton active avatar={{ size: 32 }} paragraph={{ width: ['50%', '30%'] }} title={false} />
    </Flex>
  );
});
export default SkeletonList;
