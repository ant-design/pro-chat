import { createStyles } from 'antd-style';
import { memo } from 'react';
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

export const ActionBar = () => {
  const [clearMessage] = useStore((s) => [s.clearMessage]);

  const { styles, theme } = useStyles();

  return (
    <ConfigProvider theme={{ token: { colorText: theme.colorTextSecondary } }}>
      <Flexbox
        align={'center'}
        direction={'horizontal-reverse'}
        paddingInline={12}
        className={styles.extra}
        gap={8}
      >
        <Popconfirm
          title={'你即将要清空会话，清空后将无法找回。是否清空当前会话？'}
          okButtonProps={{ danger: true }}
          okText={'清空会话'}
          onConfirm={() => {
            clearMessage();
          }}
        >
          <ActionIcon title={'清空当前会话'} icon={Trash2} />
        </Popconfirm>
      </Flexbox>
    </ConfigProvider>
  );
};

export default memo(ActionBar);
