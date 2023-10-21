import { FullToken, css } from 'antd-style';

export default (token: FullToken, prefixCls: string) => css`
  .${prefixCls}-btn {
    box-shadow: none;
  }

  .${prefixCls}-tooltip-inner {
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: unset;
    padding: 4px 8px;

    color: ${token.colorBgLayout} !important;

    background-color: ${token.colorText} !important;
    border-radius: ${token.borderRadiusSM}px !important;
  }

  .${prefixCls}-tooltip-arrow {
    &::before,
    &::after {
      background: ${token.colorText} !important;
    }
  }

  .${prefixCls}-switch-handle::before {
    background: ${token.colorBgContainer} !important;
  }

  .${prefixCls}-alert {
    span[role='img'] {
      align-self: flex-start;
      width: 16px;
      height: 16px;
      margin-top: 3px;
    }

    .${prefixCls}-alert-description {
      word-break: break-all;
      word-wrap: break-word;
    }

    &.${prefixCls}-alert-with-description {
      padding-block: 12px;
      padding-inline: 12px;

      .${prefixCls}-alert-message {
        font-size: 14px;
        font-weight: 600;
        word-break: break-all;
        word-wrap: break-word;
      }
    }
  }

  @media (max-width: 575px) {
    .${prefixCls}-tooltip {
      display: none !important;
    }
  }
`;
