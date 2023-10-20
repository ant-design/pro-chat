import { Spotlight } from '@lobehub/ui';
import { createStyles } from 'antd-style';

const useStyles = createStyles(
  ({ css, token }) => css`
    position: relative;

    width: 100%;
    height: 36px;

    background: ${token.colorBgLayout};
    border: 1px solid ${token.colorBorder};
    border-radius: ${token.borderRadius}px;
  `,
);

export default () => {
  const { styles } = useStyles();

  return (
    <div className={styles}>
      <Spotlight size={64} />
    </div>
  );
};
