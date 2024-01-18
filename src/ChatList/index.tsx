import { Fragment, memo } from 'react';

import type { ChatMessage, DivProps } from '@/types';

import ChatItem, { ChatListItemProps, ListItemProps } from './ChatListItem';
import HistoryDivider from './HistoryDivider';
import ShouldUpdateItem from './ShouldUpdateItem';
import { useStyles } from './style';

export interface ChatListProps extends DivProps, ListItemProps {
  /**
   * @description Data of chat messages to be displayed
   */
  data: ChatMessage[];
  enableHistoryCount?: boolean;
  historyCount?: number;
  loadingId?: string;
  itemShouldUpdate?: (prevProps: ChatListItemProps, nextProps: ChatListItemProps) => boolean;
}
export type {
  OnActionClick,
  OnMessageChange,
  RenderAction,
  RenderErrorMessage,
  RenderItem,
  RenderMessage,
  RenderMessageExtra,
} from './ChatListItem';

const ChatList = memo<ChatListProps>(
  ({
    onActionsClick,
    renderMessagesExtra,
    className,
    data,
    type = 'chat',
    text,
    showTitle,
    itemShouldUpdate,
    onMessageChange,
    renderMessages,
    renderErrorMessages,
    loadingId,
    renderItems,
    enableHistoryCount,
    renderActions,
    historyCount = 0,
    chatItemRenderConfig,
    ...props
  }) => {
    const { cx, styles } = useStyles();

    return (
      <div className={cx(styles.container, className)} {...props}>
        {data.map((item, index) => {
          const itemProps = {
            loading: loadingId === item.id,
            onActionsClick,
            onMessageChange,
            renderActions,
            renderErrorMessages,
            renderItems,
            renderMessages,
            renderMessagesExtra,
            showTitle,
            text,
            type,
          };

          const historyLength = data.length;
          const enableHistoryDivider =
            enableHistoryCount &&
            historyLength > historyCount &&
            historyCount === historyLength - index + 1;

          return (
            <ShouldUpdateItem
              key={item.id}
              {...itemProps}
              {...item}
              shouldUpdate={itemShouldUpdate}
            >
              <Fragment>
                <HistoryDivider enable={enableHistoryDivider} text={text?.history} />
                <ChatItem
                  {...itemProps}
                  {...item}
                  originData={item}
                  chatItemRenderConfig={chatItemRenderConfig}
                />
              </Fragment>
            </ShouldUpdateItem>
          );
        })}
      </div>
    );
  },
);

export default ChatList;
