import { ProChatMetaData } from '@/hooks/useChatList';
import { DivProps } from '@/types';
import { ReactNode } from 'react';

export type WithFalse<T> = T | false;

export interface ChatItemProps<T = Record<string, any>> {
  /**
   * @description Metadata for the avatar
   */
  avatar: ProChatMetaData;
  /**
   * @description Custom CSS class name for the chat item
   */
  className?: string;
  /**
   * @description Whether the chat item is in loading state
   */
  loading?: boolean;
  /**
   * @description The message content of the chat item
   */
  children?: ReactNode;
  messageExtra?: ReactNode;
  onAvatarClick?: () => void;

  onDoubleClick?: DivProps['onDoubleClick'];
  /**
   * @description The placement of the chat item
   * @default 'left'
   */
  placement?: 'left' | 'right';
  /**
   * @description The timestamp of the chat item
   */
  time?: number;

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
          itemDom: ReactNode;
        },
        defaultDom: ReactNode,
      ) => ReactNode
    >;
  };
  style?: React.CSSProperties;
  originData?: T;
  chatListItemContentStyle?: React.CSSProperties;
  chatListItemTitleStyle?: React.CSSProperties;
  chatListItemAvatarStyle?: React.CSSProperties;
  chatListItemExtraStyle?: React.CSSProperties;
  chatListItemContentClassName?: string;
  chatListItemTitleClassName?: string;
  chatListItemExtraClassName?: string;
  chatListItemAvatarClassName?: string;
}
