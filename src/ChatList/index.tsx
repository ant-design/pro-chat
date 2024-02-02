import { Fragment, memo, useContext } from 'react';

import type { ChatMessage, DivProps } from '@/types';

import { ConfigProvider } from 'antd';
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

/**
 * ChatList组件用于显示聊天列表。
 *
 * @component
 * @param {Object} props - 组件属性
 * @param {Function} props.onActionsClick - 点击操作按钮时的回调函数
 * @param {Function} props.renderMessagesExtra - 渲染额外的消息内容的回调函数
 * @param {string} props.className - 自定义类名
 * @param {Array} props.data - 聊天数据数组
 * @param {string} [props.type='chat'] - 聊天类型，默认为'chat'
 * @param {string} props.text - 文本内容
 * @param {boolean} props.showTitle - 是否显示标题
 * @param {Function} props.itemShouldUpdate - 判断聊天项是否需要更新的回调函数
 * @param {Function} props.onMessageChange - 消息内容变化时的回调函数
 * @param {Function} props.renderMessages - 渲染消息内容的回调函数
 * @param {Function} props.renderErrorMessages - 渲染错误消息的回调函数
 * @param {string} props.loadingId - 正在加载的聊天项的ID
 * @param {Function} props.renderItems - 渲染聊天项的回调函数
 * @param {boolean} props.enableHistoryCount - 是否启用历史记录计数
 * @param {Function} props.renderActions - 渲染操作按钮的回调函数
 * @param {number} [props.historyCount=0] - 历史记录计数
 * @param {Object} props.chatItemRenderConfig - 聊天项渲染配置
 * @returns {JSX.Element} 聊天列表组件
 */
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
    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
    const prefixClass = getPrefixCls('pro-chat');

    return (
      <div className={cx(styles.container, `${prefixClass}-list`, className)} {...props}>
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
