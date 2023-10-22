import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css, token }) => {
  return {
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
  };
});
