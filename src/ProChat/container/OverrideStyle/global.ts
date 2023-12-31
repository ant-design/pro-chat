import { FullToken, css } from 'antd-style';

export default (token: FullToken) => css`
    line-height: 1;
    text-size-adjust: none;
    text-rendering: optimizelegibility;
    vertical-align: baseline;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent;
  }
  code {
    font-family: ${token.fontFamilyCode} !important;

    span {
      font-family: ${token.fontFamilyCode} !important;
    }
  }

  p {
    word-wrap: break-word;
  }

  ::selection {
    color: #000;
    background: ${token.blue3};

    -webkit-text-fill-color: unset !important;
  }

  * {
    box-sizing: border-box;
    vertical-align: baseline;
  }

  @media only screen and (min-width: 574px) {
    * {
      ::-webkit-scrollbar {
        cursor: pointer;
        width: 4px;
        height: 4px;
        background-color: transparent;
      }

      ::-webkit-scrollbar-thumb {
        cursor: pointer;
        background-color: transparent;
        border-radius: 2px;
        transition: background-color 500ms ${token.motionEaseOut};

        &:hover {
          background-color: ${token.colorText};
        }
      }

      ::-webkit-scrollbar-corner {
        display: none;
        width: 0;
        height: 0;
      }

      &:hover {
        ::-webkit-scrollbar-thumb {
          background-color: ${token.colorFill};
        }
      }
    }
  }
`;
