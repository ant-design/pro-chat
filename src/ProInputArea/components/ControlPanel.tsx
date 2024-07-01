import ActionIcon from '@/ActionIcon';
import useProChatLocale from '@/ProChat/hooks/useProChatLocale';
import { ConfigProvider, Popconfirm } from 'antd';
import { createStyles, cx } from 'antd-style';
import { Trash2 } from 'lucide-react';
import { Flexbox } from 'react-layout-kit';
// import { useStore } from '../ProChat/store';

const useStyles = createStyles(({ css, token }) => ({
  extra: css`
    color: ${token.colorTextTertiary};
  `,
}));

interface ControlPanelProps {
  className?: string;
  clearMessage?: () => void;
  actionsRender?: (defaultDoms: React.ReactNode[]) => React.ReactNode;
  flexConfig?: Record<string, any>;
}

export const ActionBar = ({
  className,
  clearMessage,
  actionsRender,
  flexConfig,
}: ControlPanelProps) => {
  const { localeObject } = useProChatLocale();

  const { styles, theme } = useStyles();
  const defaultDoms = [
    <Popconfirm
      title={localeObject.clearModalTitle}
      okButtonProps={{ danger: true }}
      okText={localeObject.clearDialogue}
      cancelText={localeObject.cancel}
      key={'clear'}
      onConfirm={() => {
        clearMessage();
      }}
    >
      <ActionIcon title={localeObject.clearCurrentDialogue} icon={Trash2} />
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
