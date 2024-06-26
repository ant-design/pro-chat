import useProChatLocale from '@/ProChat/hooks/useProChatLocale';
import { SendOutlined } from '@ant-design/icons';
import { Button, ButtonProps, ConfigProvider } from 'antd';
import { createStyles, cx } from 'antd-style';
import { TextAreaProps } from 'antd/es/input';
import { ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import ControlPanel from './components/ControlPanel';
import ExtraModel, { ExtraItem, ExtraType } from './components/ExtraModel';
import { ProTextArea } from './components/ProTextArea';
import StopLoadingIcon from './icons/StopLoading';

const ENTER = 'enter';
const SHIFT_ENTER = 'shiftEnter';

const useStyles = createStyles(({ css, responsive, token }) => ({
  container: css`
    position: sticky;
    z-index: ${token.zIndexPopupBase};
    bottom: 0;
    padding-top: 12px;
    padding-bottom: 24px;
    background-image: linear-gradient(to top, ${token.colorBgLayout} 88%, transparent 100%);
    ${responsive.mobile} {
      width: 100%;
    }
  `,
  boxShadow: css`
    position: relative;
    border-radius: 8px;
    box-shadow: ${token.boxShadowSecondary};
  `,
  input: css`
    width: 100%;
    border: none;
    outline: none;
    border-radius: 8px;
  `,
  btn: css`
    position: absolute;
    z-index: 10;
    right: 8px;
    bottom: 6px;
    color: ${token.colorTextTertiary};
    &:hover {
      color: ${token.colorTextSecondary};
    }
  `,
  extra: css`
    color: ${token.colorTextTertiary};
  `,
}));

export type ProInputAreaProps = {
  /**
   * @description 组件的类名，用于自定义样式
   */
  className?: string;

  /**
   * @description 左侧多模态功能区
   * @type Array<ExtraItem | ExtraType>
   */
  extra?: Array<ExtraItem | ExtraType>;

  /**
   * @description 消息发送的快捷键，支持 'enter' 或 'shiftEnter'
   * @type 'enter' | 'shiftEnter'
   * @default 'enter'
   */
  sendShortcutKey?: 'enter' | 'shiftEnter';

  /**
   * @description 发送消息的回调函数，返回布尔值或 Promise 布尔值表示是否发送成功
   * @param message - 需要发送的消息内容
   * @returns {boolean | Promise<boolean>}
   */
  onSend?: (message: string) => boolean | Promise<boolean>;

  /**
   * @description 输入框内容变化的回调函数
   * @param message - 输入框的内容
   * @returns {void}
   */
  onChange?: (message: string) => void;

  /**
   * @description 清除消息的回调函数
   */
  onClearMessage?: () => void;

  /**
   * @description 更改网络状态的回调函数
   */
  onChangeNetwork?: () => void;

  /**
   * @description 重新生成消息的回调函数，支持返回 Promise 对象
   * @returns {void | Promise<void>}
   */
  onRegenerate?: () => void | Promise<void>;

  /**
   * @description 发送消息的函数
   * @param message - 需要发送的消息内容
   * @returns {void | Promise<void>}
   */
  sendMessage: (message: string) => void | Promise<void>;

  /**
   * @description 停止生成消息的函数
   */
  stopGenerateMessage: () => void;

  /**
   * @description 清除所有消息的回调函数
   */
  clearMessage?: () => void;

  /**
   * @description 消息发送状态，表示是否正在发送中
   * @type boolean
   */
  isLoading: boolean;

  /**
   * @description 输入框的占位符
   * @type string
   */
  placeholder?: string;

  /**
   * @description 输入框的属性配置
   * @type TextAreaProps
   */
  inputAreaProps?: TextAreaProps;

  /**
   * @description 自定义发送按钮的渲染函数
   * @param defaultDom - 默认的发送按钮 DOM
   * @param defaultProps - 默认的发送按钮属性
   * @returns {ReactNode}
   */
  sendButtonRender?: (defaultDom: ReactNode, defaultProps: ButtonProps) => ReactNode;

  /**
   * @description 自定义输入框的渲染函数
   * @param defaultDom - 默认的输入框 DOM
   * @param onMessageSend - 消息发送处理函数
   * @param defaultProps - 默认的输入框属性
   * @returns {ReactNode}
   */
  inputRender?: (
    defaultDom: ReactNode,
    onMessageSend: (message: string) => void | Promise<any>,
    defaultProps: TextAreaProps,
  ) => ReactNode;

  /**
   * @description 自定义输入区域的渲染函数
   * @param defaultDom - 默认的输入区域 DOM
   * @param onMessageSend - 消息发送处理函数
   * @param onClearAllHistory - 清除所有历史记录的处理函数
   * @returns {ReactNode}
   */
  inputAreaRender?: (
    defaultDom: ReactNode,
    onMessageSend: (message: string) => void | Promise<any>,
    onClearAllHistory: () => void,
  ) => ReactNode;
  /**
   * @description 其他属性，透传至源组件
   */
  [key: string]: any;
};

export const ProInputArea = ({
  className,
  sendMessage,
  stopGenerateMessage,
  isLoading,
  placeholder,
  inputAreaProps,
  sendShortcutKey = 'enter',
  extra,
  value,
  onSend,
  onChange,
  clearMessage,
  sendButtonRender,
  inputRender,
  inputAreaRender,
  ...rest
}: ProInputAreaProps) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const isChineseInput = useRef(false);
  const { styles, theme } = useStyles();
  const { localeObject } = useProChatLocale();
  const [message, setMessage] = useState('');
  const [currentShortcutKey] = useState(sendShortcutKey);

  useEffect(() => {
    if (!isChineseInput.current && onChange) {
      onChange(message);
    }
  }, [message]);

  useEffect(() => {
    if (value) {
      setMessage(value);
    }
  }, [value]);

  const send = async () => {
    if (onSend) {
      const success = await onSend(message);
      if (success) {
        sendMessage(message);
        setMessage('');
      }
    } else {
      sendMessage(message);
      setMessage('');
    }
  };

  const prefixClass = getPrefixCls('pro-chat-input-area');

  const defaultProTextAreaProps = {
    placeholder: placeholder || localeObject.placeholder,
    ...inputAreaProps,
    className: cx(styles.input, inputAreaProps?.className, `${prefixClass}-component`),
    value: message,
    onChange: (e) => {
      setMessage(e.target.value);
    },
    autoSize: { maxRows: 8 },
    onCompositionStart: () => {
      isChineseInput.current = true;
    },
    onCompositionEnd: (e) => {
      isChineseInput.current = false;
      setMessage(e.target.value);
    },
    onPressEnter: (e) => {
      if (currentShortcutKey === ENTER) {
        if (!isLoading && !e.shiftKey && !isChineseInput.current) {
          e.preventDefault();
          send();
        }
      } else if (currentShortcutKey === SHIFT_ENTER) {
        if (!isLoading && e.shiftKey && !isChineseInput.current) {
          e.preventDefault();
          send();
        }
      }
    },
    ...rest,
  };

  const defaultInput = <ProTextArea {...defaultProTextAreaProps} />;

  const inputDom = inputRender
    ? inputRender?.(
        defaultInput,
        (message) => {
          sendMessage(message);
        },
        defaultProTextAreaProps,
      )
    : defaultInput;

  const defaultButtonProps = useMemo(() => {
    return isLoading
      ? ({
          type: 'text',
          className: styles.btn,
          onClick: () => stopGenerateMessage(),
          icon: <StopLoadingIcon />,
        } as const)
      : ({
          type: 'text',
          className: styles.btn,
          onClick: () => send(),
          icon: <SendOutlined />,
        } as const);
  }, [isLoading, message]);

  const defaultButtonDom = <Button {...defaultButtonProps} />;

  const buttonDom = sendButtonRender
    ? sendButtonRender(defaultButtonDom, defaultButtonProps)
    : defaultButtonDom;

  const defaultInputArea = (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
          colorBgContainer: theme.colorBgElevated,
          controlHeightLG: 48,
          colorBorder: 'transparent',
          colorPrimaryHover: 'transparent',
        },
      }}
    >
      <Flexbox gap={8} padding={16} className={cx(styles.container, `${prefixClass}`, className)}>
        <Flexbox horizontal justify="space-between">
          <ExtraModel className={`${prefixClass}-extra`} extra={extra} />
          <ControlPanel className={`${prefixClass}-action-bar`} />
        </Flexbox>
        <Flexbox
          horizontal
          gap={8}
          align={'center'}
          className={cx(styles.boxShadow, `${prefixClass}-text-container`)}
        >
          {inputDom}
          {buttonDom}
        </Flexbox>
      </Flexbox>
    </ConfigProvider>
  );

  if (inputAreaRender) {
    return inputAreaRender(
      defaultInputArea,
      (message) => {
        sendMessage(message);
      },
      clearMessage,
    );
  }

  return defaultInputArea;
};

export default ProInputArea;
