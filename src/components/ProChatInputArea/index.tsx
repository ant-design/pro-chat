import { ProChatLocale } from '@/locale';
import { SendOutlined } from '@ant-design/icons';
import { Button, ButtonProps, ConfigProvider, Divider, Flex } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import cx from 'classnames';
import { ReactNode, useContext, useMemo, useRef, useState } from 'react';
import ActionBar from './ActionBar';
import { MentionsTextArea } from './AutoCompleteTextArea';
import StopLoadingIcon from './StopLoading';

export type ChatInputAreaProps = {
  areaRef?: React.RefObject<HTMLDivElement>;
  className?: string;
  onSend?: (message: string) => boolean | Promise<boolean>;
  inputRender?: (
    defaultDom: ReactNode,
    onMessageSend: (message: string) => void | Promise<any>,
    defaultProps: TextAreaProps,
  ) => ReactNode;
  sendButtonRender?: (defaultDom: ReactNode, defaultProps: ButtonProps) => ReactNode;
  inputAreaRender?: (
    defaultDom: ReactNode,
    onMessageSend: (message: string) => void | Promise<any>,
    onClearAllHistory: () => void,
  ) => ReactNode;
  placeholder?: string;
  loading?: boolean;
  inputAreaProps: TextAreaProps;
  clearMessage: () => void;
  stopGenerateMessage: () => void;
  onMessageSend: (message: string) => void | Promise<any>;
  actionsRender?: (defaultDoms: React.ReactNode[]) => ReactNode;
  actionStyle?: React.CSSProperties;
  locale?: ProChatLocale;
};

export const ChatInputArea = (props: ChatInputAreaProps) => {
  const {
    className,
    placeholder,
    onSend,
    inputAreaRender,
    areaRef,
    loading,
    inputRender,
    sendButtonRender,
    inputAreaProps,
    clearMessage,
    stopGenerateMessage,
    onMessageSend,
    actionStyle,
    locale,
    actionsRender,
  } = props || {};

  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const [message, setMessage] = useState('');
  const isChineseInput = useRef(false);

  const send = async () => {
    if (onSend) {
      const success = await onSend(message);
      if (success) {
        onMessageSend(message);
        setMessage('');
      }
    } else {
      onMessageSend(message);
      setMessage('');
    }
  };

  const prefixClass = getPrefixCls('pro-chat-input-area');

  /**
   * 默认的自动完成文本区域属性
   *
   * @property {string} placeholder - 输入框的占位符
   * @property {Object} inputAreaProps - 输入框的其他属性
   * @property {string} inputAreaProps.className - 输入框的类名
   * @property {string} prefixClass - 输入框的前缀类名
   * @property {string} value - 输入框的值
   * @property {function} onChange - 输入框值改变时的回调函数
   * @property {Object} autoSize - 输入框的自动调整大小配置
   * @property {number} autoSize.maxRows - 输入框的最大行数
   * @property {function} onCompositionStart - 输入法开始输入时的回调函数
   * @property {function} onCompositionEnd - 输入法结束输入时的回调函数
   * @property {function} onPressEnter - 按下回车键时的回调函数
   */
  const defaultAutoCompleteTextAreaProps = {
    placeholder: placeholder,
    ...inputAreaProps,
    className: cx(inputAreaProps?.className, `${prefixClass}-component`),
    value: message,
    onChange: (e) => {
      setMessage(e.target.value);
    },
    autoSize: { maxRows: 8 },
    onCompositionStart: () => {
      isChineseInput.current = true;
    },
    onCompositionEnd: () => {
      isChineseInput.current = false;
    },
    onPressEnter: (e) => {
      if (!loading && !e.shiftKey && !isChineseInput.current) {
        e.preventDefault();
        send();
      }
    },
  };

  const defaultInput = <MentionsTextArea {...defaultAutoCompleteTextAreaProps} />;

  /**
   * 支持下自定义输入框
   */
  const inputDom = inputRender
    ? inputRender?.(
        defaultInput,
        (message) => {
          onMessageSend(message);
        },
        defaultAutoCompleteTextAreaProps,
      )
    : defaultInput;

  /**
   * 根据 loading 状态返回默认的按钮道具。
   * 如果 loading 为 true，则按钮将具有文本类型，即 stopGenerateMessage 点击处理程序，
   * 和 StopLoadingIcon 作为图标。
   * 如果 loading 为 false，则按钮将具有文本类型、发送点击处理程序、
   * 和 SendOutlined 图标作为图标。
   * @returns The default button props.
   */
  const defaultButtonProps = useMemo(() => {
    return loading
      ? ({
          onClick: () => stopGenerateMessage(),
          icon: <StopLoadingIcon />,
          style: {
            margin: '0 12px',
            marginBottom: 8,
          },
        } as const)
      : ({
          onClick: () => send(),
          icon: <SendOutlined />,
          style: {
            margin: '0 12px',
            marginBottom: 8,
          },
        } as const);
  }, [loading, message]);

  const defaultButtonDom = <Button {...defaultButtonProps}>发送</Button>;

  const buttonDom = sendButtonRender
    ? sendButtonRender(defaultButtonDom, defaultButtonProps)
    : defaultButtonDom;

  const defaultInputArea = (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
        },
      }}
    >
      <>
        <Divider
          style={{
            margin: 0,
          }}
        />
        <ActionBar
          clearMessage={clearMessage}
          actionsRender={actionsRender}
          className={`${prefixClass}-action-bar`}
          locale={locale}
          style={actionStyle}
        />
        <Flex
          ref={areaRef}
          gap={8}
          vertical
          align={'right'}
          className={cx(`${prefixClass}`, className)}
        >
          {inputDom}
          {buttonDom}
        </Flex>
      </>
    </ConfigProvider>
  );

  if (inputAreaRender) {
    return inputAreaRender(
      defaultInputArea,
      (message) => {
        onMessageSend(message);
      },
      clearMessage,
    );
  }

  return defaultInputArea;
};

export default ChatInputArea;
