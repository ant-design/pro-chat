import { createStyles, cx } from 'antd-style';
import { Flexbox } from 'react-layout-kit';

import ActionIcon from '@/ActionIcon';
import { ConfigProvider, Popconfirm } from 'antd';
import { Trash2 } from 'lucide-react';

import { useStore } from '../../store';

const useStyles = createStyles(({ css, token }) => ({
  extra: css`
    color: ${token.colorTextTertiary};
  `,
}));

export const ActionBar = ({ className }: { className?: string }) => {
  const [clearMessage, actionsRender, flexConfig] = useStore((s) => [
    s.clearMessage,
    s.actions?.render,
    s.actions?.flexConfig,
  ]);

  const { styles, theme } = useStyles();
  const defaultDoms = [
    <Popconfirm
      title={'你即将要清空会话，清空后将无法找回。是否清空当前会话？'}
      okButtonProps={{ danger: true }}
      okText={'清空会话'}
      key={'clear'}
      onConfirm={() => {
        clearMessage();
      }}
    >
      <ActionIcon title={'清空当前会话'} icon={Trash2} />
    </Popconfirm>,
  ];

  return (
    <ConfigProvider theme={{ token: { colorText: theme.colorTextSecondary } }}>
      <Flexbox
        align={'center'}
        direction={'horizontal-reverse'}
        paddingInline={12}
        className={cx(styles.extra, className)}
        gap={8}
        {...flexConfig}
      >
        {actionsRender?.(defaultDoms) ?? defaultDoms}
      </Flexbox>
    </ConfigProvider>
  );
};

export default ActionBar;
