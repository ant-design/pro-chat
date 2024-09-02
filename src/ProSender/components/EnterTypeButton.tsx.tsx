import { Space } from 'antd';
import { cx } from 'antd-style';
import { CommandIcon, CornerDownLeft } from 'lucide-react';
import { useStyles } from '../style';

const EnterTypeButton: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    enterType?: 'enter' | 'shiftEnter';
  }
> = ({ children, enterType = 'enter', ...props }) => {
  const { styles } = useStyles();

  return (
    <Space {...props}>
      <Space className={cx(styles.enterSelectButton)}>
        <CommandIcon />
        <CornerDownLeft />
        <span>{enterType === 'enter' ? 'Send' : 'New Line'}</span>
        <span>/</span>
        <CornerDownLeft />
        <span>{enterType === 'enter' ? 'New Line' : 'Send'}</span>
      </Space>
      {children}
    </Space>
  );
};

export default EnterTypeButton;
