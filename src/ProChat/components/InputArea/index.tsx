import { SendOutlined } from '@ant-design/icons';
import { Button, ButtonProps, ConfigProvider } from 'antd';
import { createStyles, cx } from 'antd-style';
import { ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useStore } from '../../store';

import useProChatLocale from '@/ProChat/hooks/useProChatLocale';
import { TextAreaProps } from 'antd/es/input';
import { useMergedState } from 'rc-util';
import ActionBar from './ActionBar';
import { AutoCompleteTextArea } from './AutoCompleteTextArea';
import StopLoadingIcon from './StopLoading';
import { ProChatChatReference } from '@/ProChat/container/StoreUpdater';

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

export type ChatInputAreaProps = {
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
  scrollToBottom?: () => void;
};

export const ChatInputArea = (props: ChatInputAreaProps) => {
  const { className, onSend, inputAreaRender, inputRender, sendButtonRender } = props || {};
  const [sendMessage, isLoading, placeholder, inputAreaProps, editingMessage, disablePreview, clearMessage, stopGenerateMessage, updateEditingMessage] =
    useStore((s) => [
      s.sendMessage,
      !!s.chatLoadingId,
      s.placeholder,
      s.inputAreaProps,
      s.editingMessage,
      s.disablePreview,
      s.clearMessage,
      s.stopGenerateMessage,
      s.updateEditingMessage,
    ]);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const isChineseInput = useRef(false);
  const { styles, theme } = useStyles();
  const { localeObject } = useProChatLocale();

  const { value, onChange } = inputAreaProps || {};
  const [message, setMessage] = useMergedState('', {
    onChange: onChange,
    value: value,
  });

  const send = async () => {
    if (onSend) {
      const success = await onSend(editingMessage);
      if (success) {
        sendMessage(editingMessage);
        updateEditingMessage('');
      }
    } else {
      sendMessage(editingMessage);
      updateEditingMessage('');
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

  useEffect(() => {
    if (editingMessage && !disablePreview) {
      props.scrollToBottom?.();
    }
  }, [editingMessage, disablePreview, props.scrollToBottom]);
  
  const defaultAutoCompleteTextAreaProps = {
    placeholder: placeholder || localeObject.placeholder,
    ...inputAreaProps,
    className: cx(styles.input, inputAreaProps?.className, `${prefixClass}-component`),
    value: editingMessage,
    onChange: (e) => {
      updateEditingMessage(e.target.value);
    },
    autoSize: { maxRows: 8 },
    onCompositionStart: () => {
      isChineseInput.current = true;
    },
    onCompositionEnd: () => {
      isChineseInput.current = false;
    },
    onPressEnter: (e) => {
      if (!isLoading && !e.shiftKey && !isChineseInput.current) {
        e.preventDefault();
        send();
      }
    },
  };

  const defaultInput = <AutoCompleteTextArea {...defaultAutoCompleteTextAreaProps} />;

  /**
   * 支持下自定义输入框
   */
  const inputDom = inputRender
    ? inputRender?.(
        defaultInput,
        (message) => {
          sendMessage(message);
        },
        defaultAutoCompleteTextAreaProps,
      )
    : defaultInput;

  /**
   * 根据 isLoading 状态返回默认的按钮道具。
   * 如果 isLoading 为 true，则按钮将具有文本类型，即 stopGenerateMessage 点击处理程序，
   * 和 StopLoadingIcon 作为图标。
   * 如果 isLoading 为 false，则按钮将具有文本类型、发送点击处理程序、
   * 和 SendOutlined 图标作为图标。
   * @returns The default button props.
   */
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
  }, [isLoading, editingMessage]);

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
        <ActionBar className={`${prefixClass}-action-bar`} />
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

export default ChatInputArea;
