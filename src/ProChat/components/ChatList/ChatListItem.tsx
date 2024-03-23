import { FC, ReactNode } from 'react';

import { LLMRoleType } from '@/types/llm';
import { ChatMessage } from '@/types/message';

import { useRefFunction } from '@/ProChat/hooks/useRefFunction';
import ChatItem, { ChatItemProps } from '@/components/ChatItem';

export type OnMessageChange = (id: string, content: string) => void;
export type OnActionClick = (action: any, message: ChatMessage) => void;
export type RenderRole = LLMRoleType | 'default' | string;
export type RenderItem = FC<{ key: string } & ChatMessage>;
export type RenderMessage = FC<ChatMessage>;
export type RenderAction = FC<ChatMessage>;

/**
 * 聊天列表项的属性。
 * @template T 聊天列表项的额外数据类型。
 */
export type ChatListItemProps<T = Record<string, any>> = ChatMessage & {
  /**
   * 是否正在加载。
   */
  loading?: boolean;
  /**
   * 聊天项的类名。
   * @default ''
   */
  chatItemClassName?: string;
  /**
   * 聊天项的渲染函数。
   */
  chatItemRenderConfig?: ChatItemProps['chatItemRenderConfig'];
  /**
   * 原始数据。
   */
  originData?: ChatItemProps<T>['originData'];
};

/**
 * 聊天列表项组件。
 * @param props 组件属性。
 * @returns 聊天列表项组件。
 */
const ChatListItem = (props: ChatListItemProps) => {
  const { originData, loading, chatItemRenderConfig, chatItemClassName, ...item } = props;

  /**
   * 渲染消息的函数。
   * @param editableContent 可编辑的内容。
   * @param data 聊天消息的数据。
   * @returns 渲染消息的组件。
   */
  const RenderMessage = useRefFunction(
    ({ editableContent, data }: { data: ChatMessage; editableContent: ReactNode }) => {
      if (!renderMessages || !item?.role) return;
      let RenderFunction;
      if (renderMessages?.[item.role]) RenderFunction = renderMessages[item.role];
      if (!RenderFunction && renderMessages?.['default'])
        RenderFunction = renderMessages['default'];
      if (!RenderFunction) return;
      return <RenderFunction {...data} editableContent={editableContent} />;
    },
  );

  /**
   * 渲染消息额外内容的函数。
   * @param data 聊天消息的数据。
   * @returns 渲染消息额外内容的组件。
   */
  const MessageExtra = useRefFunction(({ data }: { data: ChatMessage }) => {
    if (!renderMessagesExtra || !item?.role) return;
    let RenderFunction;
    if (renderMessagesExtra?.[item.role]) RenderFunction = renderMessagesExtra[item.role];
    if (renderMessagesExtra?.['default']) RenderFunction = renderMessagesExtra['default'];
    if (!RenderFunction && !RenderFunction) return;

    return <RenderFunction {...data} />;
  });

  return (
    <ChatItem
      className={chatItemClassName}
      data-id={item.id}
      avatar={(item as any).meta}
      originData={originData}
      loading={loading}
      messageExtra={<MessageExtra data={item} />}
      placement={item.role === 'user' ? 'right' : 'left'}
      primary={item.role === 'user'}
      time={item.updateAt || item.createAt}
      chatItemRenderConfig={chatItemRenderConfig}
    >
      <RenderMessage data={item} />
    </ChatItem>
  );
};

export default ChatListItem;
