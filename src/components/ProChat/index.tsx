import {
  CSSProperties,
  MutableRefObject,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';

import RcResizeObserver from 'rc-resize-observer';
import { useRef, useState } from 'react';

import { useRefFunction } from '@/hooks/useRefFunction';
import { ProChatLocale, gLocaleObject } from '@/locale';
import { ChatMessage } from '@/types';
import { BackTopProps, Flex, FlexProps, FloatButton } from 'antd';
import cx from 'classnames';
import { ProChatUserProfile, useChatList } from '../../hooks/useChatList';
import { ModelConfig } from '../../types/config';
import ChatList, { ChatListProps } from '../ChatList';
import ChatInputArea, { ChatInputAreaProps } from '../ProChatInputArea';
import { MentionsTextAreaProps } from '../ProChatInputArea/AutoCompleteTextArea';

export type ChatListRequest<Params> = (params: Params & ModelConfig) => Promise<ChatMessage[]>;

export interface ProChatInstance<T> {
  /**
   * 获取当前聊天消息列表
   * @returns ChatMessage[]
   */
  getChatList: () => ChatMessage[];
  /**
   * 修改消息的某个属性
   * @param id
   * @param key
   * @param value
   * @returns  void
   */
  setMessageItem: (id: string, content: ChatMessage<T>) => void;
  /**
   * 滚动到底部
   * @returns
   */
  scrollToBottom?: () => void;
  /**
   * 获取当前 loading 生成的消息 id
   * @returns  消息 id ｜ undefined
   */
  getChatLoadingMessage: () => ChatMessage<T>;

  stopGenerateMessage: () => void;
  clearMessage: () => void;
  sendMessage: ChatInputAreaProps['onMessageSend'];
}

export type ProChatChatReference<T = Record<string, any>> = MutableRefObject<
  ProChatInstance<T> | undefined
>;

/**
 * ProChatProps 是 ProChat 组件的属性类型定义。
 * @template T - 聊天记录的数据类型
 */
export interface ProChatProps<
  T extends Record<string, any> = Record<string, any>,
  Params extends Record<string, any> = Record<string, any>,
> {
  params?: Params;
  initialChatsList?: ChatMessage<T>[];

  /**
   * 语言模型角色设定
   */
  config?: ModelConfig;
  /**
   * 聊天记录
   */
  chatList?: ChatMessage<T>[];
  onChatsChange?: (chatList: ChatMessage<T>[]) => void;
  request?: ChatListRequest<Params>;
  sendMessageRequest?: (
    message: ChatMessage<T>[],
    params: Params & ModelConfig,
  ) => Promise<Response | ChatMessage<T>>;

  transformToChatMessage?: (
    preChatMessage: ChatMessage,
    currentContent: { preContent: React.ReactNode; currentContent: string },
  ) => Promise<ChatMessage<T>>;

  userProfile?: ProChatUserProfile;
  /**
   * 帮助消息
   */
  helloMessage?: ReactNode;

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

  classNames?: {
    chatList?: string;
    chatInputAction?: string;
    chatInputArea?: string;
    chatListItem?: string;
    chatListItemContent?: string;
    chatListItemTitle?: string;
    chatListItemExtra?: string;
    chatListItemAvatar?: string;
  };

  styles?: {
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

export function ProChat<
  T extends Record<string, any> = Record<string, any>,
  Params extends Record<string, any> = Record<string, any>,
>(props: ProChatProps<T, Params>) {
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
    request,
    classNames,
  } = props;
  const chatListContainerRef = useRef<HTMLDivElement>(null);
  const areaHtml = useRef<HTMLDivElement>(null);
  const [isInitRender, setIsRender] = useState(false);
  const [height, setHeight] = useState('100%' as string | number);

  useEffect(() => {
    setIsRender(true);
  }, []);

  const {
    chatList,
    loadingMessage,
    loading,
    setMessageItem,
    stopGenerateMessage,
    clearMessage,
    sendMessage,
  } = useChatList({
    chatList: props.chatList,
    loading: props.loading,
    initialChatList: props.initialChatsList,
    helloMessage: props.helloMessage || '让我们开始对话吧',
    userProfile,
    request: request
      ? () => {
          return request({
            ...props.config,
            ...props.params,
          });
        }
      : undefined,
    transformToChatMessage: props.transformToChatMessage,
    sendMessageRequest: () =>
      props.sendMessageRequest(chatList, {
        ...props.config,
        ...props.params,
      }),
  });

  const getChatLoadingMessage = useRefFunction(() => loadingMessage);

  const getChatList = useRefFunction(() => {
    return chatList;
  });

  useImperativeHandle(
    chatRef,
    () => {
      return {
        stopGenerateMessage,
        clearMessage,
        sendMessage,
        getChatList,
        getChatLoadingMessage,
        setMessageItem,
        scrollToBottom: () => {
          (chatListContainerRef as any)?.current?.scrollTo({
            behavior: 'smooth',
            left: 0,
            top: chatListContainerRef.current?.scrollHeight || 99999,
          });
        },
      } as ProChatInstance<T>;
    },
    [chatRef],
  );

  useEffect(() => {
    if (chatListContainerRef.current) {
      chatListContainerRef.current.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: chatListContainerRef.current.scrollHeight,
      });
    }
  }, [loadingMessage]);

  const backBottomDom = useMemo(() => {
    if (!isInitRender) return null;
    return (
      <FloatButton.BackTop
        style={{
          bottom: 138,
        }}
        target={() => chatListContainerRef.current as HTMLElement}
        {...backToBottomConfig}
      >
        {gLocaleObject('zh-CN').backToBottom}
      </FloatButton.BackTop>
    );
  }, [isInitRender]);

  return (
    <RcResizeObserver
      onResize={(e) => {
        if (e.height !== height) {
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
      >
        <ChatList
          chatListRef={chatListContainerRef}
          chatList={chatList}
          loading={loading}
          loadingMessage={loadingMessage}
          chatItemRenderConfig={chatItemRenderConfig}
          style={{
            ...styles?.chatList,
            height: (height as number) - (areaHtml.current?.clientHeight || 0) || '100%',
          }}
          className={classNames?.chatList}
          chatListItemClassName={classNames?.chatListItem}
          chatListItemContentClassName={classNames?.chatListItem}
          chatListItemTitleClassName={classNames?.chatListItemTitle}
          chatListItemExtraClassName={classNames?.chatListItemExtra}
          chatListItemAvatarClassName={classNames?.chatListItemAvatar}
          chatListItemStyle={styles?.chatListItem}
          chatListItemContentStyle={styles?.chatListItemContent}
          chatListItemTitleStyle={styles?.chatListItemTitle}
          chatListItemExtraStyle={styles?.chatListItemExtra}
          chatListItemAvatarStyle={styles?.chatListItemAvatar}
        />
        {backBottomDom}
        <ChatInputArea
          className={classNames?.chatInputArea}
          typing={!!loadingMessage?.id}
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
