import { createStyles, cx } from 'antd-style';
import { Flexbox } from 'react-layout-kit';

import ActionIcon from '@/ActionIcon';
import { ConfigProvider, Popconfirm } from 'antd';
import { Trash2 } from 'lucide-react';

import { gLocaleObject } from '@/locale';
import { useStore } from '../../store';

const useStyles = createStyles(({ css, token }) => ({
  extra: css`
    color: ${token.colorTextTertiary};
  `,
}));

export const ActionBar = ({ className }: { className?: string }) => {
  const [clearMessage, actionsRender, flexConfig, locale] = useStore((s) => [
    s.clearMessage,
    s.actions?.render,
    s.actions?.flexConfig,
    s.locale,
  ]);

  const { styles, theme } = useStyles();
  const defaultDoms = [
    <Popconfirm
      title={gLocaleObject(locale).clearModalTitle}
      okButtonProps={{ danger: true }}
      okText={gLocaleObject(locale).clearDialogue}
      key={'clear'}
      onConfirm={() => {
        clearMessage();
      }}
    >
      <ActionIcon title={gLocaleObject(locale).clearCurrentDialogue} icon={Trash2} />
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
