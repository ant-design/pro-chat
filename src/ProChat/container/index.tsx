import { App as Container } from 'antd';
import { CSSProperties } from 'react';

import App, { ConversationProps } from './App';

import { DevtoolsOptions } from 'zustand/middleware';
import { BackBottomProps } from '../../BackBottom';
import { ChatProps } from '../store';
import { ProChatProvider } from './Provider';
import { ProChatChatReference } from './StoreUpdater';

/**
 * ProChatProps 是 ProChat 组件的属性类型定义。
 * @template T - 聊天记录的数据类型
 */
export interface ProChatProps<T extends Record<string, any>> extends ChatProps<T> {
  /**
   * @deprecated 请使用 inputAreaRender 属性替代此属性
   */
  renderInputArea?: ConversationProps['inputAreaRender'];

  /**
   * inputAreaRender 是一个函数，用于自定义输入区域的渲染。
   * @param defaultDom 默认的 DOM 元素
   * @param onMessageSend 发送消息的回调函数
   * @param onClearAllHistory 清除所有历史记录的回调函数
   */
  inputAreaRender?: ConversationProps['inputAreaRender'];

  /**
   * inputRender 是一个函数，用于自定义输入框的渲染。
   * @param defaultDom 默认的 DOM 元素
   * @param onMessageSend 发送消息的回调函数
   */
  inputRender?: ConversationProps['inputRender'];

  /**
   * 聊天发送按钮的渲染配置
   * @param defaultDom 默认的 DOM 元素
   * @param defaultProps 默认的属性
   */
  sendButtonRender?: ConversationProps['sendButtonRender'];
  /**
   * 聊天出现 Error 错误时候的自定义渲染
   * @param defaultDom 默认的 DOM 元素
   * @param defaultProps 默认的属性
   */
  renderErrorMessages?: ConversationProps['renderErrorMessages'];
  /**
   * __PRO_CHAT_STORE_DEVTOOLS__ 是一个可选的布尔值或 DevtoolsOptions 对象，用于开启 ProChat 的开发者工具。
   */
  __PRO_CHAT_STORE_DEVTOOLS__?: boolean | DevtoolsOptions;

  /**
   * showTitle 是一个可选的布尔值，用于控制是否显示聊天窗口的标题。
   */
  showTitle?: boolean;

  /**
   * style 是一个可选的 CSSProperties 对象，用于自定义聊天窗口的样式。
   */
  style?: CSSProperties;

  /**
   * className 是一个可选的字符串，用于自定义聊天窗口的类名。
   */
  className?: string;

  /**
   * chatRef 是一个可选的 ProChatChatReference 对象，用于获取 ProChat 组件的引用。
   */
  chatRef?: ProChatChatReference;

  /**
   * appStyle 是一个可选的 CSSProperties 对象，用于自定义整个应用的样式。
   */
  appStyle?: CSSProperties;

  /**
   * backToBottomConfig 是一个 Omit<BackBottomProps, 'target'> 对象，用于配置返回底部按钮的行为。
   */
  backToBottomConfig?: Omit<BackBottomProps, 'target'>;
}

export function ProChat<T extends Record<string, any> = Record<string, any>>({
  renderInputArea,
  __PRO_CHAT_STORE_DEVTOOLS__,
  showTitle,
  style,
  className,
  chatItemRenderConfig,
  backToBottomConfig,
  appStyle,
  inputRender,
  markdownProps,
  renderErrorMessages,
  inputAreaRender,
  itemShouldUpdate,
  sendButtonRender,
  ...props
}: ProChatProps<T>) {
  return (
    <ProChatProvider {...props} devtoolOptions={__PRO_CHAT_STORE_DEVTOOLS__}>
      <Container
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
          ...appStyle,
        }}
        className={className}
      >
        <App
          chatItemRenderConfig={chatItemRenderConfig}
          inputRender={inputRender}
          sendButtonRender={sendButtonRender}
          inputAreaRender={renderInputArea || inputAreaRender}
          chatRef={props.chatRef}
          showTitle={showTitle}
          style={style}
          itemShouldUpdate={itemShouldUpdate}
          renderErrorMessages={renderErrorMessages}
          backToBottomConfig={backToBottomConfig}
          className={className}
          markdownProps={markdownProps}
        />
      </Container>
    </ProChatProvider>
  );
}
