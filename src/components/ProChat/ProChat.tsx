import { CSSProperties, MutableRefObject, ReactNode, useMemo } from 'react';

import RcResizeObserver from 'rc-resize-observer';
import { useEffect, useRef, useState } from 'react';

import { ProChatLocale, gLocaleObject } from '@/locale';
import { ChatMessage } from '@/types';
import { BackTop, BackTopProps, Flex, FlexProps } from 'antd';
import cx from 'classnames';
import { ProChatUserProfile, useChatList } from '../../hooks/useChatList';
import { ModelConfig } from '../../types/config';
import ChatList, { ChatListProps } from '../ChatList';
import ChatInputArea, { ChatInputAreaProps } from '../ProChatInputArea';
import { MentionsTextAreaProps } from '../ProChatInputArea/AutoCompleteTextArea';

export type ChatRequest = (
  messages: ChatMessage[],
  config: ModelConfig,
  signal: AbortSignal | undefined,
) => Promise<Response>;

export const initialModelConfig: ModelConfig = {
  historyCount: 1,
  model: 'gpt-3.5-turbo',
  params: {
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: 0.6,
    top_p: 1,
  },
  systemRole: '',
};

export interface ChatProps<T extends Record<string, any> = Record<string, any>> {
  init?: boolean;
  initialChatsList?: ChatMessage<T>[];
  chatLoadingId?: string;

  /**
   * 语言模型角色设定
   */
  config: ModelConfig;
  /**
   * 聊天记录
   */
  chatList: ChatMessage<T>[];
  onChatsChange?: (chatList: ChatMessage<T>[]) => void;

  chatRef?: ProChatChatReference;

  userProfile: ProChatUserProfile;
  /**
   * 帮助消息
   */
  helloMessage?: ReactNode;
  request?: string | ChatRequest;

  /**
   * 生成消息 id
   * @param message
   * @returns message id
   */
  genMessageId?: (message: ChatMessage<T>[], parentId: string) => Promise<string>;

  /**
   * 重置消息
   * @returns
   */
  onResetMessage?: () => Promise<void>;

  /**
   * 获取自动完成列表的  request
   * @param value
   * @returns
   */
  autocompleteRequest?: (value: string) => Promise<
    {
      value: string;
      label?: string;
    }[]
  >;

  /**
   * 输入框的 placeholder
   */
  placeholder?: string;

  /**
   * 国际化
   */
  locale?: ProChatLocale;

  /**
   * 输入框的 props,优先级最高
   */
  inputAreaProps?: MentionsTextAreaProps;

  /**
   * 信息框额外渲染
   */
  messageItemExtraRender?: (message: ChatMessage<T>, type: 'assistant' | 'user') => React.ReactNode;

  /**
   * 信息框顶部的操作列表
   */
  actions?: {
    /**
     * 控制 input 顶部的操作区域的 flex 布局
     */
    flexConfig?: FlexProps;
    /**
     * 控制 input 顶部的操作区域的操作按钮
     * @param defaultDoms
     * @returns
     */
    render?: (defaultDoms: JSX.Element[]) => JSX.Element[];
  };
  // init
  loading?: boolean;
  /**
   * @description 聊天项的渲染函数
   */
  chatItemRenderConfig?: ChatListProps['chatItemRenderConfig'];
}

export interface ProChatInstance {
  /**
   * 获取当前聊天列表对象
   * @returns ChatStore['chatList']
   */
  getChats: () => ['chatList'];
  /**
   * 获取当前聊天消息列表
   * @returns ChatMessage[]
   */
  getChatMessages: () => ChatMessage[];
  /**
   * 设置消息内容
   * @param id
   * @param content
   * @returns  void
   */
  setMessageContent: (id: string, content: string) => void;
  /**
   * 修改消息的某个属性
   * @param id
   * @param key
   * @param value
   * @returns  void
   */
  setMessageValue: (id: string, key: keyof ChatMessage<Record<string, any>>, value: any) => void;
  /**
   * 滚动到底部
   * @returns
   */
  scrollToBottom?: () => void;
  /**
   * 获取当前 loading 生成的消息 id
   * @returns  消息 id ｜ undefined
   */
  getChatLoadingId: () => string | undefined;
}

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
   * 样式对象
   */
  style?: CSSProperties;

  styles: {
    chatList?: CSSProperties;
    chatInputAction?: CSSProperties;
    chatInputArea?: CSSProperties;
    chatListItem?: CSSProperties;
    chatListItemContent?: CSSProperties;
    chatListItemTitle?: CSSProperties;
    chatListItemExtra?: CSSProperties;
    chatListItemAvatar?: CSSProperties;
  };
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

export function ProChat<T extends Record<string, any> = Record<string, any>>(
  props: ProChatProps<T>,
) {
  const {
    style,
    className,
    chatItemRenderConfig,
    backToBottomConfig,
    inputRender,
    inputAreaRender,
    inputAreaProps,
    chatRef,
    userProfile,
    sendButtonRender,
    placeholder,
    styles,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const areaHtml = useRef<HTMLDivElement>(null);
  const [isInitRender, setIsRender] = useState(false);
  const [height, setHeight] = useState('100%' as string | number);

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

  const { chatList, loading, stopGenerateMessage, clearMessage, sendMessage } = useChatList({
    chatList: props.chatList,
    loading: props.loading,
    initialChatList: props.initialChatsList,
    helloMessage: props.helloMessage,
    userProfile,
  });

  const backBottomDom = useMemo(() => {
    if (!isInitRender) return null;
    return (
      <BackTop
        style={{
          bottom: 138,
        }}
        target={() => ref.current as HTMLElement}
        {...backToBottomConfig}
      >
        {gLocaleObject('zh-CN').backToBottom}
      </BackTop>
    );
  }, [isInitRender]);

  console.log(height as number, areaHtml.current?.clientHeight || 0);
  return (
    <RcResizeObserver
      onResize={(e) => {
        if (e.height !== height) {
          console.log(e.height);
          setHeight(e.height);
        }
      }}
    >
      <Flex
        className={cx(className)}
        style={{
          maxHeight: '100vh',
          height: '100%',
          ...style,
        }}
        vertical
        ref={ref}
      >
        <ChatList
          chatList={chatList}
          loading={loading}
          chatItemRenderConfig={chatItemRenderConfig}
          style={{
            ...styles?.chatList,
            height: (height as number) - (areaHtml.current?.clientHeight || 0) || '100%',
          }}
          chatListItemStyle={styles?.chatListItem}
          chatListItemContentStyle={styles?.chatListItemContent}
          chatListItemTitleStyle={styles?.chatListItemTitle}
          chatListItemExtraStyle={styles?.chatListItemExtra}
          chatListItemAvatarStyle={styles?.chatListItemAvatar}
        />
        {backBottomDom}
        <ChatInputArea
          placeholder={placeholder || '请输入消息...'}
          onMessageSend={sendMessage}
          stopGenerateMessage={stopGenerateMessage}
          clearMessage={clearMessage}
          areaRef={areaHtml}
          sendButtonRender={sendButtonRender}
          inputAreaRender={inputAreaRender}
          inputRender={inputRender}
          inputAreaProps={inputAreaProps}
          actionStyle={styles?.chatInputAction}
          areaStyle={styles?.chatInputArea}
        />
      </Flex>
    </RcResizeObserver>
  );
}
