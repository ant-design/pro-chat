import { FullToken, css } from 'antd-style';

export default (token: FullToken, rootClassName: string) => css`
    line-height: 1;
    text-size-adjust: none;
    text-rendering: optimizelegibility;
    vertical-align: baseline;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent;
  }

  .${rootClassName} {
    code {
      font-family: ${token.fontFamilyCode} !important;

      span {
        font-family: ${token.fontFamilyCode} !important;
      }
    }

    p {
      word-wrap: break-word;
    }

    *::selection {
      color: #000;
      background: ${token.blue3};

      -webkit-text-fill-color: unset !important;
    }

    * {
      box-sizing: border-box;
      vertical-align: baseline;
    }
  }
`;
