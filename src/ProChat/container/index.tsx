import { CSSProperties, MutableRefObject, useMemo } from 'react';

import RcResizeObserver from 'rc-resize-observer';
import { useContext, useEffect, useRef, useState } from 'react';

import { useStore } from '@/ProChat/store';
import { BackTop, BackTopProps, ConfigProvider, Flex } from 'antd';
import ChatList from '../components/ChatList';
import ChatInputArea, { ChatInputAreaProps } from '../components/InputArea';
import ChatScrollAnchor from '../components/ScrollAnchor';
import { useStyles } from './style';

import { gLocaleObject } from '@/locale';
import { ProChatInstance } from '../hooks/useProChat';
import { ChatProps } from '../store';

export type ProChatChatReference = MutableRefObject<ProChatInstance | undefined>;

/**
 * ProChatProps 是 ProChat 组件的属性类型定义。
 * @template T - 聊天记录的数据类型
 */
export interface ProChatProps<T extends Record<string, any>> extends ChatProps<T> {
  /**
   * chatRef 是一个可选的 ProChatChatReference 对象，用于获取 ProChat 组件的引用。
   */
  chatRef?: ProChatChatReference;

  /**
   * backToBottomConfig 是一个 Omit<BackBottomProps, 'target'> 对象，用于配置返回底部按钮的行为。
   */
  backToBottomConfig?: Omit<BackTopProps, 'target'>;

  /**
   * 是否显示标题
   */
  showTitle?: boolean;
  /**
   * 样式对象
   */
  style?: CSSProperties;
  /**
   * CSS类名
   */
  className?: string;
  /**
   * 输入区域的渲染函数
   * @param defaultDom 默认的 DOM 元素
   * @param onMessageSend 发送消息的回调函数
   * @param onClearAllHistory 清除所有历史记录的回调函数
   * @returns 渲染的 React 元素
   */
  inputAreaRender?: ChatInputAreaProps['inputAreaRender'];
  /**
   * 输入框的渲染函数
   * @param defaultDom 默认的 DOM 元素
   * @param onMessageSend 发送消息的回调函数
   * @param props 输入框的属性
   */
  inputRender?: ChatInputAreaProps['inputRender'];

  /**
   * 聊天发送按钮的渲染配置
   * @param defaultDom 默认的 DOM 元素
   * @param defaultProps 默认的属性
   */
  sendButtonRender?: ChatInputAreaProps['sendButtonRender'];
}

/**
 * 对话组件的属性接口
 */

export function ProChat<T extends Record<string, any> = Record<string, any>>({
  showTitle,
  style,
  className,
  chatItemRenderConfig,
  backToBottomConfig,
  inputRender,
  markdownProps,
  inputAreaRender,
  chatRef,
  sendButtonRender,
}: ProChatProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const areaHtml = useRef<HTMLDivElement>(null);
  const { styles, cx } = useStyles();
  const [isRender, setIsRender] = useState(false);
  const [height, setHeight] = useState('100%' as string | number);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const locale = useStore((s) => s.locale);

  useEffect(() => {
    // 保证 ref 永远存在
    setIsRender(true);
    if (chatRef?.current) {
      chatRef.current.scrollToBottom = () => {
        (ref as any)?.current?.scrollTo({
          behavior: 'smooth',
          left: 0,
          top: ref.current?.scrollHeight || 99999,
        });
      };
    }
  }, []);

  const prefixClass = getPrefixCls('pro-chat');

  const backBottomDom = useMemo(() => {
    if (!isRender) return null;
    return (
      <BackTop
        style={{
          bottom: 138,
        }}
        target={() => ref.current as HTMLElement}
        {...backToBottomConfig}
      >
        {gLocaleObject(locale).backToBottom}
      </BackTop>
    );
  }, [isRender]);

  return (
    <RcResizeObserver
      onResize={(e) => {
        if (e.height !== height) {
          setHeight(e.height);
        }
      }}
    >
      <Flex
        className={cx(styles.container, className, `${prefixClass}-container`)}
        style={{
          maxHeight: '100vh',
          height: '100%',
          ...style,
        }}
      >
        <div
          ref={ref}
          className={cx(`${prefixClass}-chat-list-container`)}
          style={{
            height: (height as number) - (areaHtml.current?.clientHeight || 0) || '100%',
          }}
        >
          <ChatList
            showTitle={showTitle}
            chatItemRenderConfig={chatItemRenderConfig}
            markdownProps={markdownProps}
          />
          <ChatScrollAnchor target={ref} />
        </div>
        {backBottomDom}
        <ChatInputArea
          areaRef={areaHtml}
          sendButtonRender={sendButtonRender}
          inputAreaRender={inputAreaRender}
          inputRender={inputRender}
        />
      </Flex>
    </RcResizeObserver>
  );
}
