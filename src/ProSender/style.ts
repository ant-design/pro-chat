import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => {
  return {
    container: css`
      position: relative;
      border: 1px solid ${token.colorBorder};
      border-radius: ${token.borderRadiusLG}px;
      background-color: ${token.colorBgContainer};
      box-shadow: ${token.boxShadow};
      width: 100%;
    `,

    actions: css`
      padding: ${token.paddingSM}px ${token.padding}px 0px ${token.padding}px;
    `,

    fileInfo: css`
      padding: ${token.padding}px;
      .ant-divider {
        margin: 0;
        margin-top: ${token.paddingSM}px;
      }
    `,
    sender: css`
      border: none;
      .ant-sender-inputarea {
        border: none !important;
        background-color: ${token.colorBgContainer};
        box-shadow: none;
        min-height: 80px;
      }
    `,

    enterSelectButton: css`
      color: ${token.colorTextSecondary};
      font-size: ${token.fontSizeSM}px;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: ${token.paddingSM / 4}px;

      .ant-space-item {
        height: 100%;
        display: flex;

        svg {
          align-self: end;
          justify-self: end;
          width: 1em;
          height: 1em;
        }
      }
    `,
  };
});
