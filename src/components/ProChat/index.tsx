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
import { BackTopProps, Flex, FloatButton } from 'antd';
import cx from 'classnames';
import { ProChatMetaData, ProChatUserProfile, useChatList } from '../../hooks/useChatList';
import { ModelConfig } from '../../types/config';
import ChatList, { ChatListProps } from '../ChatList';
import ChatInputArea, { ChatInputAreaProps } from '../ProChatInputArea';
import { ProChatActionBarProps } from '../ProChatInputArea/ActionBar';
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
/**
 * Represents the props for the ProChat component.
 *
 * @template T - The type of the chat message.
 * @template Params - The type of the chat parameters.
 */
export interface ProChatProps<
  T extends Record<string, any> = Record<string, any>,
  Params extends Record<string, any> = Record<string, any>,
> {
  /**
   * 聊天的参数,没次发起请求都会带入
   */
  params?: Params;

  /**
   * The initial list of chat messages.
   */
  initialChatsList?: ChatMessage<T>[];

  /**
   * The configuration for the language model.
   */
  config?: ModelConfig;

  /**
   * The list of chat messages.
   */
  chatList?: ChatMessage<T>[];

  /**
   * The callback function that is called when the chat list changes.
   *
   * @param chatList - The updated chat list.
   */
  onChatsChange?: (chatList: ChatMessage<T>[]) => void;

  /**
   * The request for fetching the chat list.
   */
  request?: ChatListRequest<Params>;

  /**
   * The request for sending a chat message.
   *
   * @param message - The chat message to send.
   * @param params - The parameters for the chat.
   * @returns A promise that resolves to the response or the sent chat message.
   */
  sendMessageRequest?: (
    message: ChatMessage<T>[],
    params: Params & ModelConfig,
  ) => Promise<Response | ChatMessage<T>>;

  /**
   * The function to transform a pre-chat message to a chat message.
   *
   * @param preChatMessage - The pre-chat message.
   * @param currentContent - The current content of the chat message.
   * @returns A promise that resolves to the transformed chat message.
   */
  transformToChatMessage?: (
    preChatMessage: ChatMessage,
    currentContent: { preContent: React.ReactNode; currentContent: string },
  ) => Promise<ChatMessage<T>>;

  /**
   * The user profile for the chat.
   */
  userProfile?: ProChatUserProfile;

  /**
   * The hello message to display.
   */
  helloMessage?: ReactNode;

  /**
   * The function to generate a message ID.
   *
   * @param message - The chat message.
   * @param parentId - The ID of the parent message.
   * @returns The generated message ID.
   */
  genMessageId?: (message: ChatMessage<T>[], parentId: string) => Promise<string>;

  /**
   * The function to reset the chat messages.
   */
  onResetMessage?: () => Promise<void>;

  /**
   * The request for fetching the autocomplete list.
   *
   * @param value - The value to autocomplete.
   * @returns A promise that resolves to the autocomplete list.
   */
  autocompleteRequest?: (value: string) => Promise<
    {
      value: string;
      label?: string;
    }[]
  >;

  /**
   * The placeholder text for the input area.
   */
  placeholder?: string;

  /**
   * The localization settings for the chat.
   */
  locale?: ProChatLocale;

  /**
   * The props for the input area.
   */
  inputAreaProps?: MentionsTextAreaProps;

  /**
   * The function to render extra content for each chat message.
   *
   * @param message - The chat message.
   * @param type - The type of the message ('assistant' or 'user').
   * @returns The rendered React node.
   */
  messageItemExtraRender?: (message: ChatMessage<T>, type: 'assistant' | 'user') => React.ReactNode;

  /**
   * The function to render actions for the chat messages.
   *
   * @param defaultDoms - The default DOM elements.
   * @returns The rendered React node.
   */
  actionsRender?: ProChatActionBarProps['actionsRender'];

  /**
   * The loading state of the chat.
   */
  loading?: boolean;

  /**
   * The configuration for rendering chat items.
   */
  chatItemRenderConfig?: ChatListProps['chatItemRenderConfig'];

  /**
   * The reference to the ProChat component.
   */
  chatRef?: ProChatChatReference;

  /**
   * The configuration for the back to bottom button.
   */
  backToBottomConfig?: Omit<BackTopProps, 'target'>;

  /**
   * The styles for the component.
   */
  style?: CSSProperties;

  /**
   * The user's metadata.
   */
  userMeta?: ProChatMetaData;

  /**
   * The assistant's metadata.
   */
  assistantMeta?: ProChatMetaData;

  /**
   * The CSS class names for the component.
   */
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

  /**
   * The CSS styles for the component.
   */
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
   * The CSS class name for the component.
   */
  className?: string;

  /**
   * The function to render the input area.
   *
   * @param defaultDom - The default DOM element.
   * @param onMessageSend - The callback function for sending a message.
   * @param onClearAllHistory - The callback function for clearing all history.
   * @returns The rendered React element.
   */
  inputAreaRender?: ChatInputAreaProps['inputAreaRender'];

  /**
   * The function to render the input box.
   *
   * @param defaultDom - The default DOM element.
   * @param onMessageSend - The callback function for sending a message.
   * @param props - The props for the input box.
   */
  inputRender?: ChatInputAreaProps['inputRender'];

  /**
   * The function to render the send button.
   *
   * @param defaultDom - The default DOM element.
   * @param defaultProps - The default props.
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
    onChatsChange,
    userMeta,
    assistantMeta,
    classNames,
    sendMessageRequest,
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
    onChatsChange: onChatsChange ? onChatsChange : undefined,
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
    sendMessageRequest: (message: ChatMessage<T>[]) =>
      sendMessageRequest
        ? sendMessageRequest(message, {
            ...props.config,
            ...props.params,
          })
        : undefined,
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
          userMeta={userMeta}
          assistantMeta={assistantMeta}
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
          actionsRender={props.actionsRender}
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
