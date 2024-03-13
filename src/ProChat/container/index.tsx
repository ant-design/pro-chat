import { App as Container } from 'antd';
import { CSSProperties, ReactNode } from 'react';

import App from './App';

import { DevtoolsOptions } from 'zustand/middleware';
import { BackBottomProps } from '../../BackBottom';
import { ChatProps } from '../store';
import { ProChatProvider } from './Provider';
import { ProChatChatReference } from './StoreUpdater';

export interface ProChatProps<T extends Record<string, any>> extends ChatProps<T> {
  renderInputArea?: (
    defaultDom: ReactNode,
    onMessageSend: (message: string) => void | Promise<any>,
    onClearAllHistory: () => void,
  ) => ReactNode;
  __PRO_CHAT_STORE_DEVTOOLS__?: boolean | DevtoolsOptions;
  showTitle?: boolean;
  style?: CSSProperties;
  className?: string;
  chatRef?: ProChatChatReference;
  appStyle?: CSSProperties;
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
  markdownProps,
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
          renderInputArea={renderInputArea}
          chatRef={props.chatRef}
          showTitle={showTitle}
          style={style}
          backToBottomConfig={backToBottomConfig}
          className={className}
          markdownProps={markdownProps}
        />
      </Container>
    </ProChatProvider>
  );
}
