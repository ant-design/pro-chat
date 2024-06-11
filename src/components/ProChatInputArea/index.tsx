import { useRefFunction } from '@/hooks/useRefFunction';
import { ChatMessage } from '@/index';
import { ProChatLocale } from '@/locale';
import { SendOutlined } from '@ant-design/icons';
import { Button, ButtonProps, ConfigProvider, Flex } from 'antd';
import cx from 'classnames';
import { useContext, useMemo, useRef, useState } from 'react';
import AnimationItem from '../Animation';
import { ProChatActionBar, ProChatActionBarProps } from './ActionBar';
import { MentionsTextArea, MentionsTextAreaProps } from './AutoCompleteTextArea';
import StopLoadingIcon from './StopLoading';
import { useStyle } from './style';

/**
 * Props for the ChatInputArea component.
 */
export type ChatInputAreaProps = {
  /**
   * Ref to the input area container.
   */
  areaRef?: React.RefObject<HTMLDivElement>;
  /**
   * Additional class name for the input area container.
   */
  className?: string;
  /**
   * Callback function triggered when the send button is clicked or the enter key is pressed.
   * Return `true` or a `Promise` that resolves to `true` to allow sending the message,
   * or `false` or a `Promise` that resolves to `false` to prevent sending the message.
   */
  onSend?: (message: string) => boolean | Promise<boolean>;
  /**
   * Custom render function for the input area.
   * Receives the default input DOM, the `onMessageSend` function, and the default props for the MentionsTextArea component.
   * Should return the custom input DOM.
   */
  inputRender?: (
    defaultDom: React.ReactNode,
    onMessageSend: (message: string) => void | Promise<any>,
    defaultProps: MentionsTextAreaProps,
  ) => React.ReactNode;
  /**
   * Custom render function for the send button.
   * Receives the default send button DOM and the default props for the Button component.
   * Should return the custom send button DOM.
   */
  sendButtonRender?: (defaultDom: React.ReactNode, defaultProps: ButtonProps) => React.ReactNode;
  /**
   * Custom render function for the input area container.
   * Receives the default input area DOM, the `onMessageSend` function, and the `onClearAllHistory` function.
   * Should return the custom input area DOM.
   */
  inputAreaRender?: (
    defaultDom: React.ReactNode,
    onMessageSend: (message: string) => void | Promise<any>,
    onClearAllHistory: () => void,
  ) => React.ReactNode;
  /**
   * Placeholder text for the input area.
   */
  placeholder?: string;
  /**
   * Props for the MentionsTextArea component.
   */
  inputAreaProps: MentionsTextAreaProps;
  /**
   * Custom CSS styles for the action buttons container.
   */
  actionStyle?: React.CSSProperties;
  /**
   * Custom CSS styles for the input area container.
   */
  areaStyle?: React.CSSProperties;
  /**
   * Locale configuration for the ProChat component.
   */
  locale?: ProChatLocale;
  /**
   * Callback function to clear the message input.
   */
  clearMessage: () => void;
  /**
   * Callback function to stop generating messages.
   */
  stopGenerateMessage: () => void;
  /**
   * Callback function triggered when a message is sent.
   * Receives the sent message as a parameter.
   */
  onMessageSend: (message: string | ChatMessage<any>) => void | Promise<any>;
  /**
   * Custom render function for the action buttons.
   * Receives an array of default action button DOMs.
   * Should return the custom action buttons DOM.
   */
  actionsRender?: ProChatActionBarProps['actionsRender'];
  /**
   * Flag indicating whether the user is currently typing.
   */
  typing: boolean;

  /**
   * Custom CSS styles for the send button.
   */
  sendButtonStyle?: React.CSSProperties;

  sendAreaStyle?: React.CSSProperties;
};

/**
 * Represents the ChatInputArea component.
 * @param props - The props for the ChatInputArea component.
 * @returns The rendered ChatInputArea component.
 */
export const ChatInputArea = (props: ChatInputAreaProps) => {
  const {
    className,
    placeholder,
    onSend,
    inputAreaRender,
    areaRef,
    typing,
    areaStyle,
    sendAreaStyle,
    inputRender,
    sendButtonRender,
    inputAreaProps,
    sendButtonStyle,
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

  const prefixClass = getPrefixCls('pro-chat-input-area');

  const { wrapSSR, hashId } = useStyle(prefixClass);

  const send = useRefFunction(async () => {
    if (onSend && message) {
      const success = await onSend(message);
      if (success) {
        onMessageSend(message);
        setMessage('');
      }
    } else {
      onMessageSend(message);
      setMessage('');
    }
  });

  /**
   * Default props for the auto-complete text area.
   */
  const defaultAutoCompleteTextAreaProps = {
    placeholder: placeholder,
    ...inputAreaProps,
    className: cx(inputAreaProps?.className, `${prefixClass}-input`, hashId),
    value: message,
    onChange: (value) => {
      setMessage(value.target.value);
    },
    autoSize: { maxRows: 8 },
    onCompositionStart: () => {
      isChineseInput.current = true;
    },
    onCompositionEnd: () => {
      isChineseInput.current = false;
    },
    onPressEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!typing && !e.shiftKey && !isChineseInput.current) {
        e.preventDefault();
        send();
      }
    },
  } as MentionsTextAreaProps;

  const defaultInput = <MentionsTextArea {...defaultAutoCompleteTextAreaProps} />;

  /**
   * Supports custom input rendering.
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
   * Returns the default button props based on the loading state.
   * If loading is true, the button will have a text type, with the stopGenerateMessage click handler,
   * and the StopLoadingIcon as the icon.
   * If loading is false, the button will have a text type, the send click handler,
   * and the SendOutlined icon as the icon.
   * @returns The default button props.
   */
  const defaultButtonProps = useMemo(() => {
    return typing
      ? ({
          onClick: () => stopGenerateMessage(),
          icon: <StopLoadingIcon />,
          style: {
            padding: '4px 8px',
            lineHeight: 1,
            height: 28,
          },
        } as const)
      : ({
          disabled: !message,
          onClick: () => send(),
          icon: <SendOutlined />,
          style: {
            padding: '4px 8px',
            lineHeight: 1,
            height: 28,
          },
        } as const);
  }, [typing, message]);

  const defaultButtonDom = (
    <Button
      {...defaultButtonProps}
      style={sendButtonStyle}
      className={cx(`${prefixClass}-button`, hashId)}
    >
      {typing ? '停止生成' : '发送'}
    </Button>
  );

  const buttonDom = sendButtonRender
    ? sendButtonRender(defaultButtonDom, defaultButtonProps)
    : defaultButtonDom;

  const defaultInputArea = wrapSSR(
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
        },
      }}
    >
      <Flex
        ref={areaRef}
        gap={2}
        vertical
        align={'right'}
        style={areaStyle}
        className={cx(`${prefixClass}`, className, hashId)}
      >
        <ProChatActionBar
          clearMessage={clearMessage}
          actionsRender={actionsRender}
          className={cx(hashId)}
          locale={locale}
          prefixClass={`${prefixClass}-action-bar`}
          style={actionStyle}
        />
        {inputDom}
        {buttonDom ? (
          <AnimationItem
            animation
            style={sendAreaStyle}
            className={cx(`${prefixClass}-send-area`, hashId)}
          >
            {buttonDom}
          </AnimationItem>
        ) : null}
      </Flex>
    </ConfigProvider>,
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
