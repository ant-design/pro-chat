import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, cx, token, prefixCls }) => {
  const prefix = `${prefixCls}-${token?.editorPrefix}-markdown`;

  return {
    container: css`
      :not(:last-child) {
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0;
        margin-inline-end: 0;
      }
    `,
    highlight: css`
      pre {
        padding: 12px !important;
      }
    `,
    markdown: css`
      color: ${token.colorText};

      h1,
      h2,
      h3,
      h4,
      h5 {
        font-weight: 600;
      }

      p {
        margin-block-start: 0;
        margin-block-end: 0;

        font-size: 14px;
        line-height: 1.8;
        color: ${token.colorText};
        word-break: break-all;
        word-wrap: break-word;

        + * {
          margin-block-end: 0.5em;
        }
      }

      > *:last-child {
        margin-bottom: 0 !important;
      }

      blockquote {
        margin: 16px 0;
        padding: 0 12px;

        p {
          font-style: italic;
          color: ${token.colorTextDescription};
        }
      }

      p:not(:last-child) {
        margin-bottom: 1em;
      }

      a {
        color: ${token.colorLink};

        &:hover {
          color: ${token.colorLinkHover};
        }

        &:active {
          color: ${token.colorLinkActive};
        }
      }

      img {
        max-width: 100%;
      }

      pre,
      [data-code-type='highlighter'] {
        border: none;
        border-radius: ${token.borderRadius}px;

        > code {
          padding: 0 !important;
          border: none !important;
        }
      }

      > :not([data-code-type='highlighter']) code {
        padding: 2px 6px;

        font-size: ${token.fontSizeSM}px;
        border-radius: ${token.borderRadiusSM}px;
      }

      table {
        border-spacing: 0;

        width: 100%;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding: 8px;

        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadius}px;

        code {
          display: inline-flex;
        }
      }

      th,
      td {
        padding-block-start: 10px;
        padding-block-end: 10px;
        padding-inline-start: 16px;
        padding-inline-end: 16px;
      }

      thead {
        tr {
          th {
            background: ${token.colorFillTertiary};

            &:first-child {
              border-top-left-radius: ${token.borderRadius}px;
              border-bottom-left-radius: ${token.borderRadius}px;
            }

            &:last-child {
              border-top-right-radius: ${token.borderRadius}px;
              border-bottom-right-radius: ${token.borderRadius}px;
            }
          }
        }
      }

      > ol > li::marker {
        color: ${token.colorPrimary} !important;
      }

      > ul > li {
        line-height: 1.8;
        list-style-type: disc;

        &::marker {
          color: ${token.colorPrimary} !important;
        }
      }

      ol,
      ul {
        > li::marker {
          color: ${token.colorTextDescription};
        }
      }

      details {
        margin-bottom: 1em;
        padding: 12px 16px;

        background: ${token.colorFillTertiary};
        border: 1px solid ${token.colorBorderSecondary};
        border-radius: ${token.borderRadiusLG}px;

        transition: all 400ms ${token.motionEaseOut};
      }

      details[open] {
        summary {
          padding-bottom: 12px;
          border-bottom: 1px solid ${token.colorBorder};
        }
      }
    `,
    wrapper: cx(css`
      background-color: ${token.colorFillTertiary};
      border-radius: ${token.borderRadius}px;
    `),
    highlighter: css`
      max-height: 400px;
      overflow: auto;
    `,
    header: cx(
      `${prefix}-header`,
      css`
        padding: 4px 8px;
        width: auto !important; // override self width
      `,
      css`
        .${prefix}-btn {
          &:hover {
            color: ${token.colorTextSecondary} !important;
          }
        }
      `,
    ),
    copy: css`
      background-color: transparent;
      position: inherit;
      width: 30px;
      padding-left: 6px;
    `,
    select: css`
      min-width: 100px;
      .${prefixCls}-select-selector {
        padding-inline-end: 4px !important;
      }
      .${prefixCls}-select-selection-overflow-item-suffix {
        .${prefixCls}-select-selection-search {
          display: none;
        }
      }
    `,
    trigger: css`
      min-width: 100px;
      display: flex;
      justify-content: center;
      span {
        font-family: ${token.fontFamilyCode} !important;
      }
    `,
    lang: cx(css`
      position: absolute;
      z-index: 2;
      right: 0;
      bottom: 8px;

      font-family: ${token.fontFamilyCode};
      color: ${token.colorTextSecondary};

      transition: opacity 0.1s;
    `),
  };
});
