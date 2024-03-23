import { Collapse, Flex, type CollapseProps } from 'antd';
import { useResponsive } from 'antd-style';
import { type ReactNode } from 'react';

import { DownOutlined } from '@ant-design/icons';
import { useStyles } from './style';

export interface FormGroupProps extends CollapseProps {
  children: ReactNode;
  extra?: ReactNode;
  icon?: ReactNode;
  title: string;
}

const FormGroup: React.FC<FormGroupProps> = ({
  className,
  icon,
  title,
  children,
  extra,
  ...props
}) => {
  const { mobile } = useResponsive();
  const { cx, styles } = useStyles();

  const titleContent = (
    <div className={styles.title}>
      {icon}
      {title}
    </div>
  );

  if (mobile)
    return (
      <Flex className={className}>
        <Flex className={styles.mobileGroupHeader} vertical justify={'space-between'}>
          {titleContent}
          {extra}
        </Flex>
        <div className={styles.mobileGroupBody}>{children}</div>
      </Flex>
    );

  return (
    <Collapse
      className={cx(styles.group, className)}
      defaultActiveKey={[1]}
      expandIcon={({ isActive }) => (
        <DownOutlined
          className={styles.icon}
          style={isActive ? { fontSize: 16 } : { fontSize: 16, rotate: '-90deg' }}
        />
      )}
      items={[
        {
          children,
          extra,
          key: 1,
          label: titleContent,
        },
      ]}
      key={1}
      {...props}
    />
  );
};

export default FormGroup;
