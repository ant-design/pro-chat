import { Flex, Skeleton } from 'antd';
import { createStyles } from 'antd-style';
import { memo } from 'react';

const useStyles = createStyles(({ css, prefixCls }) => ({
  user: css`
    display: flex;
    flex-direction: row-reverse;
    gap: 16px;

    .${prefixCls}-skeleton-paragraph {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  `,
}));
const SkeletonList = memo(() => {
  const { styles } = useStyles();

  return (
    <Flex gap={24} style={{ marginTop: 24 }}>
      <Skeleton
        active
        avatar={{ size: 40 }}
        className={styles.user}
        paragraph={{ width: ['50%', '30%'] }}
        title={false}
      />
      <Skeleton active avatar={{ size: 40 }} paragraph={{ width: ['50%', '30%'] }} title={false} />
    </Flex>
  );
});
export default SkeletonList;
