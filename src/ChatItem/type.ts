import { ReactNode } from 'react';

import { ActionsProps } from '@/ChatList/ActionsBar';
import { EditableMessageProps } from '@/EditableMessage';
import { ChatMessageError, DivProps, MetaData } from '@/types';
import { MarkdownProps } from '@ant-design/pro-editor';

export type WithFalse<T> = T | false;

export interface ChatItemProps<T = Record<string, any>> {
  /**
   * @description Actions to be displayed in the chat item
   */
  actions?: ReactNode;
  /**
   * @description Metadata for the avatar
   */
  avatar: MetaData;
  avatarAddon?: ReactNode;
  /**
   * @description Custom CSS class name for the chat item
   */
  className?: string;
  /**
   * @description Whether the chat item is in editing mode
   */
  editing?: boolean;
  /**
   * @description Props for Error render
   */
  error?: ChatMessageError;
  /**
   * @description Whether the chat item is in loading state
   */
  loading?: boolean;
  /**
   * @description The message content of the chat item
   */
  message?: ReactNode;
  messageExtra?: ReactNode;
  onAvatarClick?: () => void;
  /**
   * @description Callback when the message content changes
   * @param value - The new message content
   */
  onChange?: (value: string) => void;
  onDoubleClick?: DivProps['onDoubleClick'];
  /**
   * @description Callback when the editing mode changes
   * @param editing - The new editing mode
   */
  onEditingChange?: (editing: boolean) => void;
  /**
   * @description The placement of the chat item
   * @default 'left'
   */
  placement?: 'left' | 'right';
  /**
   * @description Whether the chat item is primary
   */
  primary?: boolean;
  renderMessage?: (content: ReactNode) => ReactNode;
  /**
   * @description Whether to show the title of the chat item
   */
  showTitle?: boolean;
  text?: EditableMessageProps['text'];
  /**
   * @description The timestamp of the chat item
   */
  time?: number;
  /**
   * @description The type of the chat item
   * @default 'block'
   */
  type?: 'block' | 'pure';

  /**
   * @description The configuration for the markdown component
   * @default {}
   */
  markdownProps?: MarkdownProps;

  /**
   * @description 聊天项渲染函数,为了保证性能他是惰性的，只有在列表项内容修改的时候才会重新执行
   * @default (props, defaultDom) => defaultDom
   */
  chatItemRenderConfig?: {
    titleRender?: WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode>;
    contentRender?: WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode>;
    actionsRender?: WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode>;
    avatarRender?: WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode>;
    render?: WithFalse<
      (
        props: ChatItemProps,
        domsMap: {
          avatar: ReactNode;
          title: ReactNode;
          messageContent: ReactNode;
          actions: ReactNode;
          itemDom: ReactNode;
        },
        defaultDom: ReactNode,
      ) => ReactNode
    >;
    actionsCallbacks?: {
      onEditFinished?: (id?: string, value?: string) => void;
      beforeDelFinished?: (id?: string) => void;
      onRegenerateFinished?: (id?: string, error?: boolean) => void;
    };
    actionsProps?: Record<string, ActionsProps>;
  };

  renderErrorMessages?: (data: ChatMessageError) => ReactNode;

  originData?: T;
}
