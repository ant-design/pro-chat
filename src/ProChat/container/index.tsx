import { App as Container } from 'antd';
import { CSSProperties, ReactNode } from 'react';

import App from './App';

import { DevtoolsOptions } from 'zustand/middleware';
import { ChatProps } from '../store';
import { ProChatProvider } from './Provider';
import { ProChatChatReference } from './StoreUpdater';

export interface ProChatProps<T extends Record<string, any>> extends ChatProps<T> {
  renderInput?: ReactNode;
  __PRO_CHAT_STORE_DEVTOOLS__?: boolean | DevtoolsOptions;
  showTitle?: boolean;
  style?: CSSProperties;
  className?: string;
  chatRef?: ProChatChatReference;
  appStyle?: CSSProperties;
}

export function ProChat<T extends Record<string, any> = Record<string, any>>({
  renderInput,
  __PRO_CHAT_STORE_DEVTOOLS__,
  showTitle,
  style,
  className,
  chatItemRenderConfig,
  appStyle,
  ...props
}: ProChatProps<T>) {
  return (
    <ProChatProvider {...props} devtoolOptions={__PRO_CHAT_STORE_DEVTOOLS__}>
      <Container
        style={{
          height: '100%',
          width: '100%',
          ...appStyle,
        }}
        className={className}
      >
        <App
          chatItemRenderConfig={chatItemRenderConfig}
          chatInput={renderInput}
          chatRef={props.chatRef}
          showTitle={showTitle}
          style={style}
          className={className}
        />
      </Container>
    </ProChatProvider>
  );
}
