import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token, css, stylish, cx }, visible: boolean) =>
  cx(
    stylish.blur,
    css`
      pointer-events: ${visible ? 'all' : 'none'};

      transform: translateY(${visible ? 0 : '16px'});

      padding-inline: 12px !important;

      opacity: ${visible ? 1 : 0};
      background: ${token.colorFillSecondary};
      border-color: ${token.colorFillTertiary} !important;
      border-radius: 16px !important;
      backdrop-filter: blur(16px);
    `,
  ),
);
