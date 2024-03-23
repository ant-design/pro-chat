import { createStyles, cx } from 'antd-style';

import { ConfigProvider, Flex, Popconfirm } from 'antd';

import { gLocaleObject } from '@/locale';
import { DeleteFilled } from '@ant-design/icons';
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
      <DeleteFilled title={gLocaleObject(locale).clearCurrentDialogue} />
    </Popconfirm>,
  ];

  return (
    <ConfigProvider theme={{ token: { colorText: theme.colorTextSecondary } }}>
      <Flex
        align={'center'}
        direction={'horizontal-reverse'}
        paddingInline={12}
        className={cx(styles.extra, className)}
        gap={8}
        {...flexConfig}
      >
        {actionsRender?.(defaultDoms) ?? defaultDoms}
      </Flex>
    </ConfigProvider>
  );
};

export default ActionBar;
