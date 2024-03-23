import { createStyles, cx } from 'antd-style';

import { ConfigProvider, Flex, FlexProps, Popconfirm } from 'antd';

import { gLocaleObject } from '@/locale';
import { DeleteFilled } from '@ant-design/icons';

const useStyles = createStyles(({ css, token }) => ({
  extra: css`
    color: ${token.colorTextTertiary};
  `,
}));

export const ActionBar = ({
  className,
  clearMessage,
  actionsRender,
  flexConfig,
  locale,
}: {
  className?: string;
  locale: string;
  flexConfig: FlexProps;
}) => {
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
        style={{
          flexDirection: 'row-reverse',
        }}
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
