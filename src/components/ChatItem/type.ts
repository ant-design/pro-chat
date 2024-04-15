import { ProChatMetaData } from '@/hooks/useChatList';
import { DivProps } from '@/types';
import { ReactNode } from 'react';

export type WithFalse<T> = T | false;

/**
 * Represents the props for a chat item component.
 */
export interface ChatItemProps<T = Record<string, any>> {
  /**
   * @description Metadata for the avatar.
   */
  avatar: ProChatMetaData;

  /**
   * @description Custom CSS class name for the chat item.
   */
  className?: string;

  /**
   * @description Whether the chat item is in loading state.
   */
  loading?: boolean;

  /**
   * @description The message content of the chat item.
   */
  children?: ReactNode;

  /**
   * @description Additional content to be displayed alongside the message.
   */
  contentAfter?: ReactNode;

  /**
   * @description Additional content to be displayed alongside the message.
   */
  contentBefore?: ReactNode;

  /**
   * @description Callback function for avatar click event.
   */
  onAvatarClick?: () => void;

  /**
   * @description Callback function for double click event.
   */
  onDoubleClick?: DivProps['onDoubleClick'];

  /**
   * @description The placement of the chat item. Defaults to 'left'.
   */
  placement?: 'left' | 'right';

  /**
   * @description The timestamp of the chat item.
   */
  time?: number;

  /**
   * @description Configuration for custom rendering of chat item components.
   */
  chatItemRenderConfig?: {
    /**
     * @description Custom rendering function for the title component.
     */
    titleRender?: WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode>;

    /**
     * @description Custom rendering function for the content component.
     */
    contentRender?: WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode>;

    /**
     * @description Custom rendering function for the actions component.
     */
    contentAfterRender?: WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode>;
    /**
     * @description Custom rendering function for the before component.
     */
    contentBeforeRender?: WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode>;

    /**
     * @description Custom rendering function for the avatar component.
     */
    avatarRender?: WithFalse<(props: ChatItemProps, defaultDom: ReactNode) => ReactNode>;

    /**
     * @description Custom rendering function for the chat item component.
     */
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

  /**
   * @description Custom CSS styles for the chat item component.
   */
  style?: React.CSSProperties;

  /**
   * @description Additional data associated with the chat item.
   */
  originData?: T;

  /**
   * @description Custom CSS styles for the chat item content.
   */
  chatListItemContentStyle?: React.CSSProperties;

  /**
   * @description Custom CSS styles for the chat item title.
   */
  chatListItemTitleStyle?: React.CSSProperties;

  /**
   * @description Custom CSS styles for the chat item avatar.
   */
  chatListItemAvatarStyle?: React.CSSProperties;

  /**
   * @description Custom CSS styles for the chat item extra content.
   */
  chatListItemExtraStyle?: React.CSSProperties;

  /**
   * @description Custom CSS class name for the chat item content.
   */
  chatListItemContentClassName?: string;

  /**
   * @description Custom CSS class name for the chat item title.
   */
  chatListItemTitleClassName?: string;

  /**
   * @description Custom CSS class name for the chat item extra content.
   */
  chatListItemExtraClassName?: string;

  /**
   * @description Custom CSS class name for the chat item avatar.
   */
  chatListItemAvatarClassName?: string;

  animation?: boolean;
}
