import { ReactNode, memo } from 'react';

import { DivProps } from '@/types';

import { Flex } from 'antd';
import { useStyles } from './style';

export interface FormTitleProps extends DivProps {
  avatar?: ReactNode;
  desc?: ReactNode;
  tag?: string;
  title: string;
}

const FormTitle = memo<FormTitleProps>(({ className, title, desc, avatar }) => {
  const { cx, styles } = useStyles();
  const titleNode = (
    <div className={cx(styles.formTitle, className)}>
      <Flex align={'center'} vertical gap={8}>
        {title}
      </Flex>
      {desc && <small>{desc}</small>}
    </div>
  );

  if (avatar) {
    return (
      <Flex align={`center`} gap={8} vertical>
        {avatar}
        {titleNode}
      </Flex>
    );
  }
  return titleNode;
});

export default FormTitle;
