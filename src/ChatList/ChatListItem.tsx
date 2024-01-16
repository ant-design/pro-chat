import { App } from 'antd';
import copy from 'copy-to-clipboard';
import { FC, ReactNode, useMemo, useState } from 'react';

import { ActionEvent } from '@/ActionIconGroup';
import ChatItem, { type ChatItemProps } from '@/ChatItem';
import { LLMRoleType } from '@/types/llm';
import { ChatMessage } from '@/types/message';

import { useRefFunction } from '@/ProChat/hooks/useRefFunction';
import ActionsBar, { type ActionsBarProps } from './ActionsBar';

export type OnMessageChange = (id: string, content: string) => void;
export type OnActionClick = (action: ActionEvent, message: ChatMessage) => void;
export type RenderRole = LLMRoleType | 'default' | string;
export type RenderItem = FC<{ key: string } & ChatMessage & ListItemProps>;
export type RenderMessage = FC<ChatMessage & { editableContent: ReactNode }>;
export type RenderMessageExtra = FC<ChatMessage>;
export type RenderErrorMessage = FC<ChatMessage>;
export type RenderAction = FC<ActionsBarProps & ChatMessage>;

export interface ListItemProps {
  groupNav?: ChatItemProps['avatarAddon'];
  loading?: boolean;
  /**
   * @description 点击操作按钮的回调函数
   */
  onActionsClick?: OnActionClick;
  /**
   * @description 消息变化的回调函数
   */
  onMessageChange?: OnMessageChange;
  renderActions?: {
    [actionKey: string]: RenderAction;
  };
  /**
   * @description 渲染错误消息的函数
   */
  renderErrorMessages?: {
    [errorType: 'default' | string]: RenderErrorMessage;
  };
  renderItems?: {
    [role: RenderRole]: RenderItem;
  };
  /**
   * @description 渲染消息的函数
   */
  renderMessages?: {
    [role: RenderRole]: RenderMessage;
  };
  /**
   * @description 渲染消息额外内容的函数
   */
  renderMessagesExtra?: {
    [role: RenderRole]: RenderMessageExtra;
  };
  /**
   * @description 是否显示聊天项的名称
   * @default false
   */
  showTitle?: boolean;
  /**
   * @description 文本内容
   */
  text?: ChatItemProps['text'] &
    ActionsBarProps['text'] & {
      copySuccess?: string;
      history?: string;
    } & {
      [key: string]: string;
    };
  /**
   * @description 聊天列表的类型
   * @default 'chat'
   */
  type?: 'docs' | 'chat';

  /**
   * @description 聊天项的类名
   * @default ''
   */
  chatItemClassName?: string;

  /**
   * @description 聊天项的渲染函数
   */
  chatItemRenderConfig?: ChatItemProps['chatItemRenderConfig'];
}

export type ChatListItemProps = ChatMessage & ListItemProps;

const Item = (props: ChatListItemProps) => {
  const {
    renderMessagesExtra,
    showTitle,
    onActionsClick,
    onMessageChange,
    type,
    text,
    renderMessages,
    renderErrorMessages,
    renderActions,
    loading,
    groupNav,
    renderItems,
    chatItemRenderConfig,
    chatItemClassName,
    ...item
  } = props;

  const [editing, setEditing] = useState(false);

  const { message } = App.useApp();

  const RenderItem = useMemo(() => {
    if (!renderItems || !item?.role) return;
    let renderFunction;
    if (renderItems?.[item.role]) renderFunction = renderItems[item.role];
    if (!renderFunction && renderItems?.['default']) renderFunction = renderItems['default'];
    if (!renderFunction) return;
    return renderFunction;
  }, [renderItems?.[item.role]]);

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

  const MessageExtra = useRefFunction(({ data }: { data: ChatMessage }) => {
    if (!renderMessagesExtra || !item?.role) return;
    let RenderFunction;
    if (renderMessagesExtra?.[item.role]) RenderFunction = renderMessagesExtra[item.role];
    if (renderMessagesExtra?.['default']) RenderFunction = renderMessagesExtra['default'];
    if (!RenderFunction && !RenderFunction) return;

    return <RenderFunction {...data} />;
  });

  const ErrorMessage = useRefFunction(({ data }: { data: ChatMessage }) => {
    if (!renderErrorMessages || !item?.error?.type) return;
    let RenderFunction;
    if (renderErrorMessages?.[item.error.type])
      RenderFunction = renderErrorMessages[item.error.type];
    if (!RenderFunction && renderErrorMessages?.['default'])
      RenderFunction = renderErrorMessages['default'];
    if (!RenderFunction) return;
    return <RenderFunction {...data} />;
  });

  const Actions = useRefFunction(({ data }: { data: ChatMessage }) => {
    if (!renderActions || !item?.role) return;
    let RenderFunction;
    if (renderActions?.[item.role]) RenderFunction = renderActions[item.role];
    if (renderActions?.['default']) RenderFunction = renderActions['default'];
    if (!RenderFunction) RenderFunction = ActionsBar;

    const handleActionClick: ListItemProps['onActionsClick'] = (action, data) => {
      switch (action.key) {
        case 'copy': {
          copy(data.content as string);
          message.success(text?.copySuccess || 'Copy Success');
          break;
        }
        case 'edit': {
          setEditing(true);
        }
      }

      onActionsClick?.(action, data);
    };

    return (
      <RenderFunction
        {...data}
        onActionClick={(actionKey) => handleActionClick?.(actionKey, data)}
        text={text}
      />
    );
  });

  const error = useMemo(() => {
    if (!item.error) return;
    return {
      message: item.error?.message,
    };
  }, [item.error]);

  /**
   * @description memoize the chat item
   */
  const memoItem = useMemo(() => {
    const dom = (
      <ChatItem
        className={chatItemClassName}
        data-id={item.id}
        actions={<Actions data={item} />}
        avatar={(item as any).meta}
        avatarAddon={groupNav}
        editing={editing}
        error={error}
        errorMessage={<ErrorMessage data={item} />}
        loading={loading}
        message={item.content}
        messageExtra={<MessageExtra data={item} />}
        onChange={(value) => onMessageChange?.(item.id, value)}
        onDoubleClick={(e) => {
          if (item.id === 'default' || item.error) return;
          if (item.role && ['assistant', 'user'].includes(item.role) && e.altKey) {
            setEditing(true);
          }
        }}
        onEditingChange={setEditing}
        placement={type === 'chat' ? (item.role === 'user' ? 'right' : 'left') : 'left'}
        primary={item.role === 'user'}
        renderMessage={(editableContent) => (
          <RenderMessage data={item} editableContent={editableContent} />
        )}
        showTitle={showTitle}
        text={text}
        time={item.updateAt || item.createAt}
        type={type === 'chat' ? 'block' : 'pure'}
        chatItemRenderConfig={chatItemRenderConfig}
      />
    );
    return dom;
  }, [props.content, props.loading, props.id, item.updateAt || item.createAt]);

  if (RenderItem) return <RenderItem key={item.id} {...props} />;

  return memoItem;
};

export default Item;
